import {
  AutocompleteInteraction,
  ChatInputApplicationCommandData,
  Client,
  CommandInteraction,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  run: (client: Client, interaction: CommandInteraction) => void;
  ephemeral?: boolean;
  skipDefer?: boolean;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
}
