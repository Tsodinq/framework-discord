import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "src/command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "Hello, world!!";

    await interaction.followUp({
      ephemeral: true,
      content,
    });
  },
};
