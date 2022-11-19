import { Command } from "./command";
import { Discord } from "./commands/discord";
import { Framework } from "./commands/framework";
import { Hello } from "./commands/hello";
import { Key } from "./commands/key";
import { Version } from "./commands/version";

export const commands: Command[] = [Hello, Version, Key, Discord, Framework];
