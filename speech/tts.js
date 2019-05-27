'use strict';

const rp = require('request-promise');
const fs = require('fs');
const readline = require('readline-sync');
const xmlbuilder = require('xmlbuilder');

function getAccessToken(subscriptionKey) {
    let options = {
        method: 'POST',
        uri: 'https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    }
    return rp(options);
}



module.exports.tts = async (event, context, callback) => {

    function textToSpeech(accessToken, text) {
        let xml_body = xmlbuilder.create('speak')
            .att('version', '1.0')
            .att('xml:lang', 'en-us')
            .ele('voice')
            .att('xml:lang', 'en-us')
            .att('name', 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)')
            .txt(text)
            .end();
    
        let body = xml_body.toString();
    
        let options = {
            method: 'POST',
            baseUrl: 'https://westus.tts.speech.microsoft.com/',
            url: 'cognitiveservices/v1',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'cache-control': 'no-cache',
                'User-Agent': 'ctt',
                'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
                'Content-Type': 'application/ssml+xml'
            },
            body: body
        }
    
        let request = rp(options)
            .on('response', (response) => {
                if (response.statusCode === 200) {
                    //request.pipe(fs.createWriteStream('TTSOutput.wav'));
                    console.log('\nYour file is ready.\n');
                    const callbackResponse = {
                        statusCode: 200,
                        headers: {
                          "Access-Control-Allow-Origin": "*",
                          "Content-Type": "audio/wav"
                        },
                        body: JSON.stringify(request.pipe(fs.createWriteStream('TTSOutput.wav'))),
                      };
                      callback(null, callbackResponse);
                }
            });
        return request;
    }

    const subscriptionKey = process.env.SPEECH_SERVICE_KEY;
    if (!subscriptionKey) {
        throw new Error('Environment variable for your subscription key is not set.')
    };

    const data = JSON.parse(event.body);
    // Prompts the user to input text.
    //const text = readline.question('What would you like to convert to speech? ');
    const text = data.text;

    try {
        const accessToken = await getAccessToken(subscriptionKey);
        await textToSpeech(accessToken, text);
        /*const tts = await textToSpeech(accessToken, text);
        tts.on('finish', function(file) {
            const response = {
                statusCode: 200,
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Content-Type": "audio/wav"
                },
                body: file,
              };
              callback(null, response);
        });*/
    } catch (err) {
        console.error(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Unable to get speech file.',
        });
        return;
    }

    /*const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "audio/wav"
      },
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });*/
};
