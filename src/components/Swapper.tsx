// import React from 'react';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { Button } from "react-native-elements";

// export default function Swapper({ 
//     sourceLanguage, 
//     targetLanguage, 
//     setSourceLanguage, 
//     setTargetLanguage, 
//     setOriginalText, 
//     setTranslatedText, 
//     originalText, 
//     translatedText 
// }): React.ReactElement {
//     const swapLanguages = () => {
//         setSourceLanguage(targetLanguage);
//         setTargetLanguage(sourceLanguage);
//         setOriginalText(translatedText);
//         setTranslatedText(originalText);
//     };

//     return (
//         <Button
//             type='clear'
//             buttonStyle={{ paddingTop: 35 }}
//             icon={
//                 <Icon
//                     name='swap-horiz' 
//                     color='#eff7fd' 
//                     size={50}
//                 />
//             }
//             onPress={() => swapLanguages()}
//         />
//     );
// }