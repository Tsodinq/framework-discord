import {
  ApplicationCommandType, Client, Colors, CommandInteraction
} from "discord.js";
import fetch from "node-fetch";
import { API_BASE, IMG_BASE } from "../api";
import { Command } from "../command";

export const Framework: Command = {
  name: "framework",
  description: "Retrieve your Framework profile, if you've connected your Discord account.",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const userId = interaction.user.id;

    await fetch(API_BASE + `/api/admin/users/discord/${userId}`, {
      method: "GET",
      headers: {
        Authorization: String(process.env.API),
      },
    })
      .then((res) => res.json())
      .then(async (res: {
        success: boolean;
        user: {
          avatarUri?: string;
          username: string;
          bio: string;
          alias?: string;
          id: string;
          role: "USER" | "ADMIN";
          createdAt: string;
          premium: boolean;
        }
      }) => {
        if (res.success) {
          await interaction.followUp({
            embeds: [
              {
                title: res.user.username,
                description: res.user.bio,
                fields: [
                  {
                    name: "Alias",
                    value: res.user.alias || "No alias set.",
                    inline: true,
                  },
                  {
                    name: "ID",
                    value: res.user.id,
                    inline: true,
                  },
                  {
                    name: "Role",
                    value: res.user.role,
                    inline: true,
                  },
                  {
                    name: "Created At",
                    value: res.user.createdAt,
                    inline: true,
                  },
                  {
                    name: "Premium",
                    value: res.user.premium ? "Subscribed" : "Not subscribed",
                    inline: true,
                  },
                ],
                color: Colors.Blue,
                thumbnail: {
                  url: IMG_BASE + res.user.avatarUri || "https://cdn.discordapp.com/embed/avatars/0.png",
                },
                url: API_BASE + `/profile/${res.user.username}`,
              },
            ],
          });
        } else {
          await interaction.followUp({
            content: "You need to connect your Discord account to your Framework account first.",
          });
        }
      })
      .catch(async (err) => {
        await interaction.followUp({
          content: `An error has occurred: ${err}`,
        });
      });
  },
};
