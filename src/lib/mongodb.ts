import { MongoClient, type Db } from "mongodb"

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>
}

function getClientPromise() {
  const uri = process.env.MONGO_CONNECTION_STRING

  if (!uri) {
    throw new Error("MONGO_CONNECTION_STRING is not configured.")
  }

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri)
    globalForMongo.mongoClientPromise = client.connect()
  }

  return globalForMongo.mongoClientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  return client.db("RisingStar")
}
