import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import interactionCreate from "./listeners/interactionCreate";
import join from "./listeners/join";
import ready from "./listeners/ready";

console.log("Starting...");
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

ready(client);
interactionCreate(client);
join(client);

client.login(String(process.env.TOKEN));
