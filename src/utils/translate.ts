import * as RNFS from 'react-native-fs';

import tts from '../services/tts';
import stt from '../services/stt';
import translateText from '../services/translateText';

const translate = (
    audioFile, 
    encoding, 
    sourceLanguage, 
    targetLanguage,
    setOriginalText,
    setTranslatedText
): Promise<void> => {
    return RNFS.readFile(audioFile, encoding)
            .then(content => {
                return stt(content, sourceLanguage.longCode);
            })
            .then(text => {
                const transcriptedText = text.results[0].alternatives[0].transcript;
                console.log(transcriptedText);
                setOriginalText(transcriptedText);

                return translateText(transcriptedText, sourceLanguage.shortCode, targetLanguage.shortCode);
            })
            .then(result => {
                const translatedText = result.data.translations[0].translatedText;
                console.log(translatedText);
                setTranslatedText(translatedText);

                return tts(translatedText, targetLanguage.longCode, targetLanguage.voiceCode);
            })
            .catch(error => console.log(error));
};

export default translate;