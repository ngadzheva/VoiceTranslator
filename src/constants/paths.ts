import RNFetchBlob from 'rn-fetch-blob';

const audioPaths = {
    recordedAudio: 'record.wav',
    translatedAudio: `${RNFetchBlob.fs.dirs.CacheDir}/result.wav`
};

export default audioPaths;