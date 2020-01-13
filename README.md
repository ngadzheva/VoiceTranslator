# VoiceTranslator
@FMI Embedded Systems Project 2020

The purpose of the project is to develop a mobile application for voice to voice translation. The user must be able to:
- Choose an input language (the spoken one) and output language (the translated one).
- Record his voice on the selected input language and receive a translation on the selected output language both as text and as voice.

For that purpose, the received speech should be transcribed to text on the selected input language, this text should be translated
to the selected output language and the a speech should be generated from the translated text. This is achieved by using **Google Cloud 
Speech-to-Text API**, **Google Cloud Translation API** and **Microsoft Azure Text-to-Speech API**.
