import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./src/screens/auth/login";
import RegisterScreen from "./src/screens/auth/register";
import LoadingScreen  from "./src/screens/loading";
import HomeScreen from "./src/screens/home";
import Constants from "./src/config/constants";
import * as firebase from "firebase";


firebase.initializeApp(Constants.FirebaseConfig);

const appStack = createStackNavigator ({
  Home:HomeScreen
});

const authStack = createStackNavigator ({
  Login:LoginScreen,
  Register: RegisterScreen
});

export default createAppContainer(
  createSwitchNavigator(
      {
          Loading: LoadingScreen,
          App: appStack,
          Auth: authStack
      },
      {
          initialRouteName: "Loading"
      }
  )
);

