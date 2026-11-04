import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_CONNECTION_STRING as string);
const db = client.db("RisingStar");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true, 
  }, 
});