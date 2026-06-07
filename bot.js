import 'dotenv/config'
import {Client, GatewayIntentBits} from 'discord.js';
import {joinVoiceChannel, createAudioPlayer, createAudioResource} from '@discordjs/voice';

const client = new Client({intents: [GatewayIntentBits.Guilds,
                                     GatewayIntentBits.GuildVoiceStates]});

client.once('ready', () => console.log('connected to server...'));

client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hello') {
        await interaction.reply('hi hi! <|°ᴗ°|>')
    }
    else if(interaction.commandName === 'soundlist') {
        await interaction.reply("available sounds are:\n\n'hellnah'\n'bruh'");
    }
    else if(interaction.commandName === 'play') {
        const song_name = interaction.options.getString('song_name');

        const member = interaction.member;
        const vc = member.voice.channel;

        if(!vc) {
            await interaction.reply('ur not in a voice channel :(');
            return;
        }

        const connection = joinVoiceChannel({
            channelId: vc.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(`./sounds/${song_name}.wav`);

        player.play(resource);
        connection.subscribe(player);

        await interaction.reply(`playing ${song_name}.wav...`);
    }
});
