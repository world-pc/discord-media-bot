import {execFile} from 'child_process'
import {promisify} from 'util'
import fs from 'fs/promises'

const execFileAsync = promisify(execFile);

async function textToSpeech(message) {
    
    await fs.writeFile('./tts_files/msg.txt', message);

    try {
        
        const {stdout, stderr} = await execFileAsync(
            './venv/bin/piper',
            ['--model', './venv/piper_voices/en_GB-southern_english_female-low.onnx',
             '--input_file', './tts_files/msg.txt',
             '--output_file', './tts_files/message.wav']
        );

        console.log(stdout);
        console.log(stderr);
    }

    catch(err) {
        console.error('exit code:', err.code);
        console.error('stderr:', err.stderr);
        console.error('stdout:', err.stdout);
    }

    fs.unlink('./tts_files/msg.txt');
}

export default {textToSpeech};
