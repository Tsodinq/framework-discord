import { Client } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

console.log("Starting...");
dotenv.config();

const client = new Client({
  intents: [],
});

ready(client);
interactionCreate(client);

client.login(String(process.env.TOKEN));
