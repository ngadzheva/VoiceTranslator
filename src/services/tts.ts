import * as xmlbuilder from 'xmlbuilder';
import RNFetchBlob from 'rn-fetch-blob';
import Permissions from 'react-native-permissions';

import { 
    MICROSOFT_AZURE_API_KEY, 
    MICROSOFT_AZURE_ISSUE_TOKEN_URL,
    MICROSOFT_AZURE_TTS_API_URL 
} from 'react-native-dotenv';

import { audioPaths } from '../constants/index';

const requestPermission = async (): Promise<void> => {
    const p = await Permissions.request("android.permission.WRITE_EXTERNAL_STORAGE");
    console.log('permission request', p);
};

const checkPermission = async (): Promise<void> => {
    const p = await Permissions.check("android.permission.WRITE_EXTERNAL_STORAGE");
    console.log('permission check', p);

    return requestPermission();
  };

function ssmlRequest(languageCode, voiceCode, text): string {
    const xmlBody = xmlbuilder.create('speak')
        .att('version', '1.0')
        .att('xml:lang', 'en-us')
        .ele('voice')
        .att('xml:lang', languageCode)
        .att('name', voiceCode) // Short name for 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)'
        .txt(text)
        .end(); 
    
    return xmlBody.toString();
}

async function textToSpeech(accessToken, text, languageCode, voiceCode): Promise<void> {
    const body = ssmlRequest(languageCode, voiceCode, text);
  
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'cache-control': 'no-cache',
        'User-Agent': 'YOUR_RESOURCE_NAME',
        'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
        'Content-Type': 'application/ssml+xml'
    };
  
    const result = RNFetchBlob
                    .fetch('POST', MICROSOFT_AZURE_TTS_API_URL, headers, body)
                    .then(async (resp) => {
                        await checkPermission();
                        console.log('');

                        const exists = RNFetchBlob.fs.exists(audioPaths.translatedAudio);

                        if(exists) {
                            return RNFetchBlob.fs.writeFile(audioPaths.translatedAudio, resp.data, 'base64');
                        }

                        return RNFetchBlob.fs.createFile(audioPaths.translatedAudio, resp.data, 'base64');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
    
    return await result;
}

async function tts(text, languageCode, voiceCode): Promise<void> {
  // Reads subscription key from env variable.
  // You can replace this with a string containing your subscription key. If
  // you prefer not to read from an env variable.
  // e.g. const subscriptionKey = "your_key_here";
  if (!MICROSOFT_AZURE_API_KEY) {
    throw new Error('Environment variable for your subscription key is not set.');
  }

  // Prompts the user to input text.
  try {
    return await fetch(MICROSOFT_AZURE_ISSUE_TOKEN_URL, {
                    method: 'POST',
                    headers: {
                        'Ocp-Apim-Subscription-Key': MICROSOFT_AZURE_API_KEY
                    }
                })
                .then(response => response.text())
                .then(accessToken => textToSpeech(accessToken, text, languageCode, voiceCode));
  } catch (err) {
    console.log(`Something went wrong: ${err}`);
  }
}

export default tts;