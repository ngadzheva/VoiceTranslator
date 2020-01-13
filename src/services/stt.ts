import { GOOGLE_SPEECH_API_URL, GOOGLE_API_KEY } from 'react-native-dotenv';

import { postRequest } from './httprequests';

const stt = (audioContent, languageCode): Promise<any> => {
    const data = {
        audio: {
            content: audioContent
        },
        config: {
            sampleRateHertz: 16000,
            languageCode
        }
    };

    console.log(audioContent);
    return postRequest(GOOGLE_SPEECH_API_URL, GOOGLE_API_KEY, data);
};

export default stt;