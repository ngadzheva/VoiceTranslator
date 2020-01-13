import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Buffer } from 'buffer';
import Permissions from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';

import translate from '../utils/translate';
import play from '../utils/play';
import { audioPaths } from '../constants/index';

interface Props {
  sourceLanguage: { [key: string]: string }; 
  targetLanguage: { [key: string]: string }; 
  setOriginalText: (text: string) => void; 
  setTranslatedText: (text: string) => void;
}

const VoiceTranslator = ({
  sourceLanguage, 
  targetLanguage, 
  setOriginalText, 
  setTranslatedText 
}: Props): React.FunctionComponentElement<{}> => {
  const [audioFile, setAudioFile] = useState('');
  const [recording, setRecording] = useState(false);
  
  const requestPermissions = async (): Promise<void> => {
    const p = await Permissions.request("android.permission.RECORD_AUDIO");
    const q = await Permissions.check("android.permission.WRITE_EXTERNAL_STORAGE");
    console.log('permission request', p, q);
  };

  const checkPermissions = async (): Promise<void> => {
    const p = await Permissions.check("android.permission.RECORD_AUDIO");
    const q = await Permissions.check("android.permission.WRITE_EXTERNAL_STORAGE");
    console.log('permission check', p, q);

    return requestPermissions();
  };

  useEffect(() => {
      const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: audioPaths.recordedAudio
    };

    checkPermissions()
      .then(() => {
        AudioRecord.init(options);
    
        AudioRecord.on('data', data => {
          const chunk = Buffer.from(data, 'base64');
          console.log('chunk size', chunk.byteLength);
        });
      });
  }, []);

  const start = (): void => {
    console.log('start record');

    setAudioFile('');
    setRecording(true);

    AudioRecord.start();

    setOriginalText('');
    setTranslatedText('');
  };

  const stop = async (): Promise<void> => {
    if (!recording) return;

    console.log('stop record');

    const audio = await AudioRecord.stop();
    
    setAudioFile(audio);
    setRecording(false);

    const start = new Date().getTime();

    translate(
      audioFile, 
      'base64', 
      sourceLanguage, 
      targetLanguage,
      setOriginalText,
      setTranslatedText
    ).then(() => {
      const end = new Date().getTime();
      console.log(`${end - start} ms`);

      play();
    });
  };

  return (
    <View>
      <Button
        type='clear'
        icon={
          <Icon 
            name='mic' 
            color={recording ? 'red' : '#eff7fd'} 
            size={60}
          />
        }
        onPressIn={start}
        onPressOut={stop}
      />
    </View>
  );
};
export default VoiceTranslator;
