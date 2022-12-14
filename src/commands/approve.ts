import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Client,
  Colors,
  CommandInteraction,
} from "discord.js";
import { Command } from "../command";
import prisma from "../prisma";

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
        content:
          "I've created a new database entry for this user. Please run the command again.",
      });

      await prisma.guildMember.create({
        data: {
          userId: String(userId),
          guildId: String(interaction.guildId),
          canGenerateInvite: false,
        },
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
