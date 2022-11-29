import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Client,
  Colors,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../command";
import prisma from "../prisma";

export const StaffInfo: Command = {
  name: "staffinfo",
  description: "Get information about a staff member.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "The staff member to get information about.",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const guildMember = await interaction.guild?.members.fetch(
      interaction.options.getUser("user")?.id as string
    );
    if (!guildMember) {
      await interaction.followUp({
        content: "I couldn't find that user in this guild.",
      });
      return;
    }
    if (
      !guildMember.roles.cache.some((r) => r.permissions.has("KickMembers"))
    ) {
      await interaction.followUp({
        content: "That user is not a staff member.",
      });
      return;
    }

    const user = await prisma.guildMember.findFirst({
      where: {
        userId: interaction.options.getUser("user")?.id,
        guildId: String(interaction.guildId),
      },
      include: {
        staffContactInfo: true,
      },
    });

    if (!user) {
      await interaction.followUp({
        content: "Something unexpected happened.",
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(`${guildMember.user.username} Staff Contact`)
      .setColor(Colors.Blurple)
      .setThumbnail(guildMember.user.avatarURL())
      .setFields(
        user.staffContactInfo.map((info) => ({
          name: info.name,
          value: info.value,
          inline: true,
        }))
      )
      .setFooter({
        text: "This bot is made by Vice President, CK_Gin0.",
      });

    await interaction.followUp({
      embeds: [embed],
    });
  },
};
