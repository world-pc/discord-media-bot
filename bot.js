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
}
