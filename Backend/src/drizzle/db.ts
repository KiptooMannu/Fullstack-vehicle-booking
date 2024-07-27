import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema"
import Stripe from 'stripe';


export const client = new Client({
    connectionString: process.env.Database_URL as string,   //get the database url from the environment
})

const main = async () => {
    await client.connect();  //connect to the database
}
main();


const db = drizzle(client, { schema, logger: true })  //create a drizzle instance

export default db; 

export const stripe = new Stripe(process.env.STRIPE_SECRET_API_KEY as string,{
    apiVersion: '2024-06-20',
    typescript: true
});