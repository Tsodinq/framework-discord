import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import fetch from "node-fetch";
import { API_BASE } from "../api";
import { Command } from "../command";

export const Version: Command = {
  name: "version",
  description: "Get information on the current version of Framework",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    await fetch(API_BASE + "/api/doc/version", {
      method: "GET",
      headers: {
        Authorization: String(process.env.API),
      },
    })
      .then((res) => res.text())
      .then(async (res: string) => {
        await interaction.followUp({
          embeds: [
            {
              title: "Framework Version",
              description: `Framework is currently on version ${res}.`,
              color: 0x00ff00,
            },
          ],
        });
      })
      .catch(async (err) => {
        await interaction.followUp({
          content: `An error has occurred: ${err}`,
        });
      });
  },
};
