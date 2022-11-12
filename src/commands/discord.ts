import {
  ApplicationCommandType,
  Client,
  Colors,
  CommandInteraction,
} from "discord.js";
import fetch from "node-fetch";
import { API_BASE } from "../api";
import { Command } from "../command";

export const Discord: Command = {
  name: "discord",
  description: "Connect your Discord account to your Framework account.",
  type: ApplicationCommandType.ChatInput,
  ephemeral: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    const userId = interaction.user.id;
    const imageUrl = interaction.user.avatarURL();
    const username = interaction.user.username;
    const discriminator = interaction.user.discriminator;

    await fetch(API_BASE + "/api/admin/service/discord/connect/new", {
      method: "POST",
      headers: {
        Authorization: String(process.env.API),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
        imageUrl,
        username,
        discriminator,
      }),
    })
      .then((res) => res.json())
      .then(async (res: { code: string }) => {
        await interaction.editReply({
          embeds: [
            {
              title: "Connect your Discord account",
              url: API_BASE + "/services/discord",
              description: `Go to ${API_BASE}/services/discord and enter the following code:`,
              fields: [
                {
                  name: "Code",
                  value: res.code,
                },
              ],
              color: Colors.Greyple,
              footer: {
                text: "This code will expire in 5 minutes.",
              },
            },
          ],
        });
      })
      .catch(async (err) => {
        await interaction.editReply({
          content: "An error occurred while trying to connect your account.",
        });

        console.error(err);
      });
  },
};
