import { MongoClient, ObjectId } from "mongodb"

const BASE = "http://localhost:3000"
const BACKEND = "https://the-rising-star-server.vercel.app"
const stamp = Date.now()
const password = "TestPassword123!"
const hostEmail = `opencode-host-${stamp}@example.com`
const guestEmail = `opencode-guest-${stamp}@example.com`
const title = `OpenCode Booking Test ${stamp}`
const date = "2026-12-15"

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING)
await client.connect()
const db = client.db("RisingStar")

let studioId = null
const bookingIds = []

function cookiesFrom(response) {
  const raw = response.headers.getSetCookie?.() ?? []
  return raw.map((cookie) => cookie.split(";")[0]).join("; ")
}

async function api(path, options = {}, cookie = "") {
  const response = await fetch(BASE + path, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
      ...(options.headers ?? {}),
    },
  })
  const text = await response.text()
  let body = null
  try {
    body = JSON.parse(text)
  } catch {
    body = text
  }
  return { response, body, cookie: cookiesFrom(response) }
}

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const response = await fetch(BASE + "/")
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error("Server did not become ready")
}

function assert(condition, message) {
  if (!condition) throw new Error("ASSERT FAILED: " + message)
  console.log("PASS:", message)
}

try {
  await waitForServer()
  console.log("Server ready")

  const hostSignUp = await api("/api/auth/sign-up/email", {
    method: "POST",
    body: JSON.stringify({ email: hostEmail, password, name: "Host Test" }),
  })
  assert(hostSignUp.response.ok, "host sign-up works")
  const hostCookie = hostSignUp.cookie

  const guestSignUp = await api("/api/auth/sign-up/email", {
    method: "POST",
    body: JSON.stringify({ email: guestEmail, password, name: "Guest Test" }),
  })
  assert(guestSignUp.response.ok, "guest sign-up works")
  const guestCookie = guestSignUp.cookie

  const studioResponse = await fetch(BACKEND + "/studio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      category: "Photo Studio",
      maxCapacity: 4,
      location: "Test City",
      hourlyRate: 50,
      securityDeposit: 25,
      imageUrl:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
      ],
      amenities: ["Wi-Fi"],
      overview: "A studio created by the booking flow test.",
      hostName: "Host Test",
      hostEmail,
      rating: 0,
      reviewCount: 0,
    }),
  })
  const studioBody = await studioResponse.json()
  studioId = studioBody.insertedId ?? studioBody.result?.insertedId
  assert(Boolean(studioId), "test studio created")

  const createBooking = await api(
    "/bookings",
    {
      method: "POST",
      body: JSON.stringify({
        studioId,
        bookingDate: date,
        startTime: "10:00",
        endTime: "12:00",
      }),
    },
    guestCookie
  )
  assert(createBooking.response.status === 201, "guest can create a booking")
  const bookingId = createBooking.body._id
  bookingIds.push(bookingId)
  assert(createBooking.body.totalPrice === 100, "booking total is computed correctly")

  const overlap = await api(
    "/bookings",
    {
      method: "POST",
      body: JSON.stringify({
        studioId,
        bookingDate: date,
        startTime: "11:00",
        endTime: "13:00",
      }),
    },
    guestCookie
  )
  assert(overlap.response.status === 409, "overlapping booking is rejected")

  const selfBooking = await api(
    "/bookings",
    {
      method: "POST",
      body: JSON.stringify({
        studioId,
        bookingDate: "2026-12-16",
        startTime: "10:00",
        endTime: "11:00",
      }),
    },
    hostCookie
  )
  assert(selfBooking.response.status === 400, "host cannot book their own studio")

  const myBookings = await api("/my-bookings", {}, guestCookie)
  assert(
    typeof myBookings.body === "string" &&
      myBookings.body.includes(title) &&
      myBookings.body.includes("Pending"),
    "guest sees the pending booking on My bookings"
  )

  const hostBookings = await api("/host-bookings", {}, hostCookie)
  assert(
    typeof hostBookings.body === "string" &&
      hostBookings.body.includes(title) &&
      hostBookings.body.includes("Guest Test"),
    "host sees the request on Host bookings"
  )

  const confirm = await api(
    `/bookings/${bookingId}/status`,
    { method: "PATCH", body: JSON.stringify({ status: "Confirmed" }) },
    hostCookie
  )
  assert(
    confirm.response.ok && confirm.body.status === "Confirmed",
    "host can confirm a pending booking"
  )

  const guestBookingsAfterConfirm = await api("/my-bookings", {}, guestCookie)
  assert(
    typeof guestBookingsAfterConfirm.body === "string" &&
      guestBookingsAfterConfirm.body.includes("Confirmed"),
    "guest sees the confirmed status"
  )

  const guestCancelConfirmed = await api(
    `/bookings/cancel/${bookingId}`,
    { method: "PATCH" },
    guestCookie
  )
  assert(
    guestCancelConfirmed.response.status === 409,
    "guest cannot cancel a confirmed booking"
  )

  const strangerCancel = await api(
    `/bookings/cancel/${bookingId}`,
    { method: "PATCH" },
    hostCookie
  )
  assert(
    strangerCancel.response.status === 403,
    "host cannot cancel a guest's booking through the guest endpoint"
  )

  const complete = await api(
    `/bookings/${bookingId}/status`,
    { method: "PATCH", body: JSON.stringify({ status: "Completed" }) },
    hostCookie
  )
  assert(
    complete.response.ok && complete.body.status === "Completed",
    "host can complete a confirmed booking"
  )

  const secondBooking = await api(
    "/bookings",
    {
      method: "POST",
      body: JSON.stringify({
        studioId,
        bookingDate: "2026-12-17",
        startTime: "10:00",
        endTime: "11:00",
      }),
    },
    guestCookie
  )
  assert(secondBooking.response.status === 201, "guest can create a second booking")
  const secondBookingId = secondBooking.body._id
  bookingIds.push(secondBookingId)

  const cancel = await api(
    `/bookings/cancel/${secondBookingId}`,
    { method: "PATCH" },
    guestCookie
  )
  assert(
    cancel.response.ok && cancel.body.status === "Cancelled",
    "guest can cancel their own pending booking"
  )
} finally {
  try {
    if (bookingIds.length > 0) {
      await db.collection("bookings").deleteMany({
        _id: { $in: bookingIds.map((id) => new ObjectId(id)) },
      })
    }
    if (studioId) {
      await db.collection("studio").deleteOne({ _id: new ObjectId(studioId) })
    }
    const emails = [hostEmail, guestEmail]
    const users = await db
      .collection("user")
      .find({ email: { $in: emails } })
      .project({ _id: 1 })
      .toArray()
    const userIds = users.map((user) => user._id)
    if (userIds.length > 0) {
      await db.collection("session").deleteMany({ userId: { $in: userIds.map(String) } })
      await db.collection("account").deleteMany({ userId: { $in: userIds.map(String) } })
      await db.collection("user").deleteMany({ _id: { $in: userIds } })
    }
    console.log("CLEANUP: test users, studio, and bookings removed")
  } catch (error) {
    console.error("CLEANUP ERROR:", error.message)
  } finally {
    await client.close()
  }
}
