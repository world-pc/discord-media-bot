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
    'fanfare'
];

async function printSoundList(interaction) {
    await interaction.reply(`available sounds are: \n\n${available_sounds.join('\n')}`);
}

async function playSound(interaction) {
    const sound_name = interaction.options.getString('sound_name');
    const member = interaction.member;
    const vc = member.voice.channel;

    if(!vc) {
        await interaction.reply('ur not in a voice channel :(');
        return;
    }
    else {
        try {
        }
        catch(err) {
        }
    }
}

export default {printSoundList, available_sounds};
