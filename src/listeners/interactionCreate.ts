import {
  AutocompleteInteraction,
  Client,
  CommandInteraction,
  Interaction,
  ModalSubmitInteraction,
} from "discord.js";
import { commands } from "../commands";
import prisma from "../prisma";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
    }
    if (interaction.isAutocomplete()) {
      const slashCommand = commands.find(
        (c) => c.name === interaction.commandName
      );

      slashCommand?.autocomplete?.(interaction as AutocompleteInteraction);
    }
    if (interaction.isModalSubmit()) {
      if ((interaction as ModalSubmitInteraction).customId === "contactModal") {
        const inter = interaction as ModalSubmitInteraction;
        const name = inter.fields.getTextInputValue("nameInput");
        const value = inter.fields.getTextInputValue("valueInput");

        if (!name || !value) {
          await interaction.reply({
            content: "Please make sure to fill out all fields.",
          });
          return;
        }

        await prisma.staffContactInfo.create({
          data: {
            user: {
              connect: {
                guildId_userId: {
                  guildId: String(interaction.guildId),
                  userId: interaction.user.id,
                },
              },
            },
            name,
            value,
          },
        });

        await interaction.reply({
          content: "Contact added successfully!",
        });
      }
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = commands.find((c) => c.name === interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  const userId = interaction.user.id;
  const dbExists = await prisma.guildMember.findFirst({
    where: {
      userId,
    },
  });

  if (!dbExists) {
    await prisma.guildMember.create({
      data: {
        userId,
        guildId: String(interaction.guildId),
      },
    });
  }

  if (!slashCommand.skipDefer) {
    await interaction.deferReply({
      ephemeral: slashCommand.ephemeral,
    });
  }

  slashCommand.run(client, interaction);
};
