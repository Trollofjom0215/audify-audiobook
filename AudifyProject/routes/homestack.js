import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import App from '../App';
import audBook from './audBook';
const screens = {
	home : {
		screen : App
	},
	audBook : {
		screen : audBook
	}
}



const HomeStack = createStackNavigator({screens});

export default createAppContainer(HomeStack);