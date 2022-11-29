import {
  ActionRowBuilder,
  ApplicationCommandType,
  Client,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { Command } from "../command";

export const AddContact: Command = {
  name: "addcontact",
  description: "Add an admin contact. For use by admins only.",
  type: ApplicationCommandType.ChatInput,
  defaultMemberPermissions: ["KickMembers"],
  skipDefer: true,
  run: async (client: Client, interaction: CommandInteraction) => {
    const modal = new ModalBuilder()
      .setCustomId("contactModal")
      .setTitle("Add Contact");

    const nameInput = new TextInputBuilder()
      .setCustomId("nameInput")
      .setLabel("What's the name of the contact?")
      .setPlaceholder("My email address")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(48);

    const valueInput = new TextInputBuilder()
      .setCustomId("valueInput")
      .setLabel("What's the value of the contact?")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("joe@soodam.rocks")
      .setMaxLength(128);

    const firstRow = new ActionRowBuilder().addComponents(nameInput);
    const secondRow = new ActionRowBuilder().addComponents(valueInput);

    modal.addComponents(
      firstRow as ActionRowBuilder<TextInputBuilder>,
      secondRow as ActionRowBuilder<TextInputBuilder>
    );

    await interaction.showModal(modal);
  },
};
