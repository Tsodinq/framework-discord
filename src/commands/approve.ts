import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  Colors,
  ApplicationCommandOptionType,
} from "discord.js";
import fetch from "node-fetch";
import prisma from "../prisma";
import { API_BASE } from "../api";
import { Command } from "../command";

export const Approve: Command = {
  name: "approve",
  description: "Approve a user's Framework invite key generation availability.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["KickMembers"],
  options: [
    {
      name: "user",
      description: "The user to approve.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const userId = interaction.options.getUser("user")?.id;
    const user = await prisma.guildMember.findFirst({
      where: {
        userId,
      },
    });

    if (!user) {
      await interaction.followUp({
        content: "That user is not in the database, this is not normal.",
      });
      return;
    }

    const update = await prisma.guildMember.update({
      where: {
        guildId_userId: {
          guildId: String(interaction.guildId),
          userId: String(userId),
        },
      },
      data: {
        canGenerateInvite: !user.canGenerateInvite,
      },
    });

    await interaction.followUp({
      embeds: [
        {
          title: "User Updated",
          description: `Successfully updated user <@${userId}>.`,
          fields: [
            {
              name: "Eligibility",
              value:
                (update.canGenerateInvite ? "Eligible" : "Ineligible") +
                " to generate invite keys.",
            },
          ],
          color: Colors.Green,
        },
      ],
    });
  },
};
