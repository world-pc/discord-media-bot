import 'dotenv/config';
import {REST, Routes, SlashCommandBuilder} from 'discord.js';

const commands = [
    new SlashCommandBuilder()
        .setName('hello')
        .setDescription('say hi to bot')
].map(cmd => cmd.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN)

await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    {body: commands}
);
