import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Translator from '../screens/Translator';

const Screens = createSwitchNavigator({
    Home,
    Translator,
});

export default createAppContainer(Screens);