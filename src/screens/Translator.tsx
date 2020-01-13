import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import TextCard from '../components/TextCard';
import LanguageDropdown from '../components/LanguageDropdown';
import VoiceTranslator from '../components/VoiceTranslator';
// import Swapper from '../components/Swapper';

import languages from '../constants/languages';

const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-color-literals
    languages: {
        backgroundColor: '#3f51b5',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        paddingBottom: 40
    },
    // eslint-disable-next-line react-native/no-color-literals
    root: {
        backgroundColor: '#3f51b5',
        flexDirection: 'column',
        paddingTop: 30
    }
});

export default function Translator(): React.ReactElement {
    const [sourceLanguage, setSourceLanguage] = useState(languages[0]);
    const [targetLanguage, setTargetLanguage] = useState(languages[1]);

    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    return (
        <ScrollView style={styles.root}>
            <TextCard language={sourceLanguage} text={originalText} />
            <TextCard language={targetLanguage} text={translatedText} />

            <View style={styles.languages}>
                <LanguageDropdown
                    handleLanguage={setSourceLanguage}
                    language={sourceLanguage}
                    setOriginalText={setOriginalText}
                    setTranslatedText={setTranslatedText}
                />
                {/* TODO: Swap languages */}
                {/* <Swapper
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    setSourceLanguage={setSourceLanguage}
                    setTargetLanguage={setTargetLanguage}
                    setOriginalText={setOriginalText}
                    setTranslatedText={setTranslatedText}
                    originalText={originalText}
                    translatedText={translatedText}
                /> */}
                <VoiceTranslator
                    sourceLanguage={sourceLanguage}
                    targetLanguage={targetLanguage}
                    setOriginalText={setOriginalText}
                    setTranslatedText={setTranslatedText}
                />
                <LanguageDropdown
                    handleLanguage={setTargetLanguage}
                    language={targetLanguage}
                    setOriginalText={setOriginalText}
                    setTranslatedText={setTranslatedText}
                />
            </View>
        </ScrollView>
    );
}
