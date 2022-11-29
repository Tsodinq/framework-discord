import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Client,
  CommandInteraction,
} from "discord.js";
import { Command } from "../command";
import prisma from "../prisma";

export const RemoveContact: Command = {
  name: "removecontact",
  description: "Remove a staff contact. (Staff only)",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "name",
      description: "The name of the contact to remove.",
      type: ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true,
    },
  ],
  defaultMemberPermissions: ["KickMembers"],
  autocomplete: async (interaction) => {
    const focused = interaction.options.getFocused();
    const choices = await prisma.staffContactInfo.findMany({
      where: {
        user: {
          guildId: String(interaction.guildId),
          userId: String(interaction.user.id),
        },
      },
    });

    const filtered = choices.filter((c) =>
      c.name.toLowerCase().startsWith(focused.toLowerCase())
    );
    await interaction.respond(
      filtered.map((c) => ({
        name: c.name,
        value: c.name,
      }))
    );
  },
  run: async (client: Client, interaction: CommandInteraction) => {
    const name = interaction.options.get("name", true);
    const contact = await prisma.staffContactInfo.findFirst({
      where: {
        name: String(name.value),
        user: {
          guildId: String(interaction.guildId),
          userId: String(interaction.user.id),
        },
      },
    });

    if (!contact) {
      await interaction.followUp({
        content: "You don't have a contact with that name.",
      });
      return;
    }

    await prisma.staffContactInfo.delete({
      where: {
        id: contact.id,
      },
    });

    await interaction.followUp({
      content: "Contact removed.",
    });
  },
};
