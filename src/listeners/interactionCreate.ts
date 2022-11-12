import { CommandInteraction, Client, Interaction } from "discord.js";
import prisma from "../prisma";
import { commands } from "../commands";

export default (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction);
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

  await interaction.deferReply({
    ephemeral: slashCommand.ephemeral,
  });

  slashCommand.run(client, interaction);
};
