import 'dotenv/config'
import {Client, GatewayIntentBits} from 'discord.js';

const client = new Client({intents: [GatewayIntentBits.Guilds,
                                     GatewayIntentBits.GuildVoiceStates]});

client.once('ready', () => console.log('connected to server...'));

client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hello') {
        await interaction.reply('hi hi! <|°ᴗ°|>')
    }
    else if(interaction.commandName === 'play') {
        const song_name = interaction.options.getString('song_name');
        await interaction.reply(`it seems u wanted to play "${song_name}"`)
    }
});
