import 'dotenv/config';
import {REST, Routes, SlashCommandBuilder} from 'discord.js';

const commands = [
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('get usage info'),

    new SlashCommandBuilder()
        .setName('hello')
        .setDescription('say hi to media bot'),
    
    new SlashCommandBuilder()
        .setName('soundlist')
        .setDescription('outputs the list of available sounds for /play'),

    new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song, should we have it.')
        .addStringOption(option => 
            option.setName('song_name')
                  .setDescription('name of song to play.')
                  .setRequired(true)),

    new SlashCommandBuilder()
        .setName('vc_tts')
        .setDescription('text to speech!')
        .addStringOption(option =>
            option.setName('message')
                  .setDescription('message u would like to speak.')
                  .setRequired(true)),

    new SlashCommandBuilder()
        .setName('music')
        .setDescription('play some music.')
        .addStringOption(option =>
            option.setName('title')
                  .setDescription('title of the song u would like to play.')
                  .setRequired(true))
        .addStringOption(option =>
            option.setName('artist')
                  .setDescription('artist for song u would like to play.')
                  .setRequired(false))
        .addStringOption(option =>
            option.setName('album')
                  .setDescription('album the song\'s on.')
                  .setRequired(false)),

    new SlashCommandBuilder()
        .setName('musiclist')
        .setDescription('print music library.')


].map(cmd => cmd.toJSON());

const rest = new REST().setToken(process.env.DISCORD_TOKEN)

await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    {body: commands}
);
