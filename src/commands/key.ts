import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  Colors,
} from "discord.js";
import fetch from "node-fetch";
import prisma from "../prisma";
import { API_BASE } from "../api";
import { Command } from "../command";

export const Key: Command = {
  name: "key",
  description: "Generate a Framework invite key, and join our platform!",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const userId = interaction.user.id;

    const generated = await prisma.guildMember.findFirst({
      where: {
        userId,
      },
    });

    if (Number(generated?.generatedInviteKeys) >= 5) {
      await interaction.followUp({
        content: "You have already generated 5 invite keys.",
      });
      return;
    }

    await fetch(API_BASE + "/api/admin/invites/new/1", {
      method: "POST",
      headers: {
        Authorization: String(process.env.API),
      },
    })
      .then((res) => res.json())
      .then(async (res: Array<string>) => {
        await prisma.guildMember.update({
          where: {
            guildId_userId: {
              guildId: String(interaction.guildId),
              userId,
            },
          },
          data: {
            generatedInviteKeys: {
              increment: 1,
            },
          },
        });

        await interaction.followUp({
          content: "I've sent you a DM with your invite key.",
        });

        await interaction.user.send({
          embeds: [
            {
              title: "Invite Key",
              url: API_BASE + "/login",
              description: `Your invite key is \`${res[0]}\`. Navigate to ${API_BASE}/login and use this key to get started!`,
              color: Colors.Blue,
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
