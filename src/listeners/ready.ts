import { Client } from "discord.js";
import { commands } from "../commands";

export default (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    console.log("Ready!");
    await client.application.commands.set(commands);
  });
};
