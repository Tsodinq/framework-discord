import { Command } from "./command";
import { AddContact } from "./commands/addcontact";
import { Approve } from "./commands/approve";
import { Discord } from "./commands/discord";
import { Framework } from "./commands/framework";
import { Hello } from "./commands/hello";
import { Key } from "./commands/key";
import { RemoveContact } from "./commands/removecontact";
import { StaffInfo } from "./commands/staffinfo";
import { Version } from "./commands/version";

export const commands: Command[] = [
  Hello,
  Version,
  Key,
  Discord,
  Framework,
  Approve,
  AddContact,
  StaffInfo,
  RemoveContact,
];
