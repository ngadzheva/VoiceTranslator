import { GOOGLE_TRANSLATE_API_URL, GOOGLE_API_KEY } from 'react-native-dotenv';

import { postRequest } from './httprequests';

const translateText = (text, sourceLanguage, targetLanguage): Promise<any> => {
    const data = {
        q: text,
        source: sourceLanguage,
        target: targetLanguage
    };

    return postRequest(GOOGLE_TRANSLATE_API_URL, GOOGLE_API_KEY, data);
};

export default translateText;