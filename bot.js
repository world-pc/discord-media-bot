import 'dotenv/config'
import {Client, GatewayIntentBits} from 'discord.js';

const client = new Client({intents: [GatewayIntentBits.Guilds,
                                     GatewayIntentBits.GuildVoiceStates]});

client.once('ready', () => console.log('bot online :0'));

client.login(process.env.DISCORD_TOKEN);
