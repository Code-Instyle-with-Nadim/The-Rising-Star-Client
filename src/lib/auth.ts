import { betterAuth } from "better-auth"
import { jwt } from "better-auth/plugins"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const globalForAuth = globalThis as typeof globalThis & {
  authMongoClient?: MongoClient
}

const connectionString = process.env.MONGO_CONNECTION_STRING

if (!connectionString) {
  throw new Error("MONGO_CONNECTION_STRING is not configured.")
}

const client =
  globalForAuth.authMongoClient ?? new MongoClient(connectionString)
const db = client.db("RisingStar")

if (process.env.NODE_ENV !== "production") {
  globalForAuth.authMongoClient = client
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 604800,
    },
  },
})
