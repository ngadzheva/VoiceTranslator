import Sound from 'react-native-sound';

import { audioPaths } from '../constants/index';

let sound = null;

const load = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      sound = new Sound(audioPaths.translatedAudio, '', error => {
        if (error) {
          console.log('failed to load the file', error);
          return reject(error);
        }

        return resolve();
      });
    });
};

const play = async (): Promise<void> => {
  await load();

  Sound.setCategory('Playback');

  sound.play(success => {
    if (success) {
      console.log('successfully finished playing');
    } else {
      console.log('playback failed due to audio decoding errors');
    }

    sound.release();
  });
};

export default play;