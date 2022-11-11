import { Command } from "./command";
import { Hello } from "./commands/hello";
import { Key } from "./commands/key";
import { Version } from "./commands/version";

export const commands: Command[] = [Hello, Version, Key];
