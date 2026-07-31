import 'dotenv/config'
import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import tts from './tts.js'

import {Client, GatewayIntentBits} from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, 
    createAudioResource, AudioPlayerStatus } from '@discordjs/voice';    

let idle_timeout = null; //stores the timeout object for disconnecting after some amount of idle time in vca
let timeout_time = 15 * 60 * 1000; // 15 minutes
function setIdleTimeout(connection) {
    idle_timeout = setTimeout(() => {
        connection.destroy();
    }, timeout_time);
}
function clearIdleTimeout() {
    if(idle_timeout) {
        clearTimeout(idle_timeout);
        idle_timeout = null;
    }
}


const client = new Client({intents: [GatewayIntentBits.Guilds,
                                     GatewayIntentBits.GuildVoiceStates]});

client.once('ready', () => console.log('connected to server...'));

client.on('debug', console.log);
client.on('warn', console.log);

client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hello') {
        await interaction.reply('hi hi! <|°ᴗ°|>')
    }
    else if(interaction.commandName === 'help') {
        await interaction.reply(`available commands:\n
                                    /hello
                                    /play <soundname (use /soundlist for list of valid soundname>
                                    /vc_tts <message>`);
    }
    else if(interaction.commandName === 'soundlist') {
        const available_sounds = [
            'hellnah',
            'bruh',
            'gasolina',
            'masterchief',
            'potatoes',
            'doorstop',
            'scratch',
            'fart',
            'archangels',
            'fanfare'];
        await interaction.reply(`available sounds are: \n${available_sounds.join('\n')}`);
    }
    else if(interaction.commandName === 'play') {
        const song_name = interaction.options.getString('song_name');

        const member = interaction.member;
        const vc = member.voice.channel;

        if(!vc) {
            await interaction.reply('ur not in a voice channel :(');
            return;
        }
        else {
            try {
                await interaction.reply(`playing ${song_name}.wav...`);

                const connection = joinVoiceChannel({
                    channelId: vc.id,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                });

                const player = createAudioPlayer();
                const resource = createAudioResource(`./sounds/${song_name}.wav`);

                player.play(resource);
                connection.subscribe(player);

                player.on(AudioPlayerStatus.Playing, () => setIdleTimeout(connection));
                player.on(AudioPlayerStatus.Idle, () => clearIdleTimeout());
            }
            catch(err) {
                console.error("songs, something went wrong: ", err);
            }
        }
    }
    else if(interaction.commandName === 'vc_tts') {
        const message = interaction.options.getString('message');

        const member = interaction.member;
        const vc = member.voice.channel;

        if(!vc) {
            await interaction.reply('ur not in a voice channel :(');
            return;
        }
        else {
            try {
                await interaction.deferReply();
                await tts.textToSpeech(message);
            }
            catch(err) {
                console.error('tts failed: ', err);
                await interaction.reply('tts failed :(');
            }
            finally {
                //fs.unlink(os.tmpdir()+'message.wav', () => {});
            }

            try {
                await interaction.editReply(`playing message.wav...`);

                const connection = joinVoiceChannel({
                    channelId: vc.id,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator
                });

                const player = createAudioPlayer();
                const resource = createAudioResource(`./tts_files/message.wav`);

                player.play(resource);
                connection.subscribe(player);

                //player.on(AudioPlayerStatus.Idle, () => connection.destroy());
            }
            catch(err) {
                console.error("something went wrong: ", err);
            }
        }
    }
});

client.on('shardDisconnect', (event, shard_id) => {
    console.log(`shard {shard_id} disconnected. code: {event.code}, reason: '{event.reason}'`);
});

client.on('shardReconnecting', (shard_id) => {
    console.log(`shard {shard_id} reconnecting...`);
});

client.on('shardResume', (shard_id, replayed_events) => {
    console.log(`resuming shard {shard_id}. replaying events {replayed_events}`);
});

client.on('shardError', (error, shard_id) => {
    console.error(`shard {shard_id} error: `, error);
});

process.on('uncaughtException', (err) => {
    console.error('uncaught exception: ', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('unhandled rejection at ', promise, ' reason: ', reason);
});
