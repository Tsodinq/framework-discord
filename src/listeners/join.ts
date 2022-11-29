import { Client, Colors, EmbedBuilder } from "discord.js";

export default (client: Client): void => {
  client.on("guildMemberAdd", async (member) => {
    const channel = String(process.env.WELCOME_CHANNEL_ID);
    if (!channel) return;

    const guild = await client.guilds.fetch(member.guild.id);
    const welcomeChannel = await member.guild.channels.cache.get(channel);

    const embed = new EmbedBuilder()
      .setTitle("Welcome 👋")
      .setDescription(`Welcome to ${guild.name}, ${member.user.username}!`)
      .setThumbnail(member.user.avatarURL())
      .setColor(Colors.Aqua)
      .setFields([
        {
          name: "Rules",
          value: "Please make sure to read the rules!",
          inline: true,
        },
        {
          name: "Soodam.re Privacy Policy & Terms of Service",
          value:
            "You agree to the Soodam.re Privacy Policy and Terms of Service by being a member of this server.",
          inline: true,
        },
      ])
      .setFooter({
        text: "This bot is made with ❤️ by Soodam.re and contributors.",
      });

    welcomeChannel?.isTextBased() && welcomeChannel.send({ embeds: [embed] });
  });
};
