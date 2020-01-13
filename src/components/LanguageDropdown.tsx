import React from "react";
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import { languages } from "../constants";

interface Props {
  handleLanguage: React.Dispatch<React.SetStateAction<{
    name: string;
    longCode: string;
    shortCode: string;
    voiceCode: string;
  }>>;
  language: { [key: string]: string };
  setOriginalText: (text: string) => void;
  setTranslatedText: (text: string) => void;
}

const styles = StyleSheet.create({
  container: {
    width: 100
  }
});

export default function LanguageDropdown({ 
  handleLanguage, 
  language, 
  setOriginalText,
  setTranslatedText 
}: Props): React.ReactElement {
  const data = languages.map(language => { 
    return { value: language.name }; 
  });

  return (
      <Dropdown
          containerStyle={styles.container}
          textColor='white'
          selectedItemColor='gray'
          itemColor='black'
          fontSize={18}
          value={language.name}
          data={data}
          onChangeText={(value): void => {
            setOriginalText('');
            setTranslatedText('');

            languages.forEach(language => {
              if(language.name === value) {
                handleLanguage(language);
              }
            });
          }}
      />
    );
}
