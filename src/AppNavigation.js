import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import LaunchScreen from "./screens/LaunchScreen";
import { Colors } from "./themes";

import Icon from "react-native-vector-icons/Entypo";

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {}
  }
);

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: PrimaryNav
      //Others
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === "Home") {
            iconName = `home`;
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
          } else if (routeName === "Carts") {
            iconName = `shopping-cart`;
          } else if (routeName === "Contacts") {
            iconName = `old-phone`;
          }

          return <Icon name={iconName} size={40} color={Colors.panther} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: Colors.fire,
        inactiveTintColor: Colors.panther
      }
    }
  )
);
