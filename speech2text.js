const speech = require('@google-cloud/speech');
const fs = require('fs');
const path = require('path');
const ora = require('ora');

const projectId = 'despegar';

const client = new speech.SpeechClient({
  projectId: projectId,
  keyFilename: path.join(__dirname, 'auth.json')
});

const fileName = process.argv[2];
 
const file = fs.readFileSync(fileName);
const audioBytes = file.toString('base64');

const audio = {
  content: audioBytes,
};

const config = {
  encoding: 'OGG_OPUS',
  sampleRateHertz: 8000,
  languageCode: 'es',
};

const request = {
  audio: audio,
  config: config,
};

process.stdout.write('\033c');
const spinner = ora({
	color: 'blue',
	text: 'Transcribiendo'
}).start();


client
  .recognize(request)
  .then(data => {
    const response = data[0];
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    spinner.stop();
    
    let fn = fileName.split("/");
    fn = fn[fn.length - 1];
    
    process.stdout.write('\033c');
    console.log(`Archivo: ${fn}`);
    console.log(`Transcripción: ${transcription}`);
  })
  .catch(err => {
    clearInterval(twirlTimer);
    console.error('ERROR:', err);
  });