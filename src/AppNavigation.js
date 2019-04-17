import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import LaunchScreen from "./screens/LaunchScreen";
import StarshipsScreen from "./screens/starships/StarshipsScreen";
import RocketsScreen from "./screens/starships/RocketsScreen";
import RocketDetailsScreen from "./screens/starships/RocketDetailsScreen";
import DragonsScreen from "./screens/starships/DragonsScreen";
import DragonDetailsScreen from "./screens/starships/DragonDetailsScreen";
import ShipsScreen from "./screens/starships/ShipsScreen";
import ShipDetailsScreen from "./screens/starships/ShipDetailsScreen";

import MoreScreen from "./screens/MoreScreen";

import { Colors } from "./themes";

import Icon from "react-native-vector-icons/Entypo";

const PrimaryNav = createStackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen }
  },
  {
    headerMode: "none",
    initialRouteName: "LaunchScreen",
    navigationOptions: {}
  }
);

const StarshipsNav = createStackNavigator(
  {
    StarshipsScreen: { screen: StarshipsScreen },
    RocketsScreen: { screen: RocketsScreen },
    RocketDetailsScreen: { screen: RocketDetailsScreen },

    DragonsScreen: { screen: DragonsScreen },
    DragonDetailsScreen: { screen: DragonDetailsScreen },

    ShipsScreen: { screen: ShipsScreen },
    ShipDetailsScreen: { screen: ShipDetailsScreen }
  },
  {
    initialRouteName: "StarshipsScreen"
    // headerMode: "none"
  }
);

StarshipsNav.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Starships: StarshipsNav,
      Home: PrimaryNav,
      More: MoreScreen
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
      initialRouteName: "Home",
      headerMode: "none",

      tabBarOptions: {
        activeTintColor: Colors.fire,
        inactiveTintColor: Colors.panther,
        style: {
          backgroundColor: Colors.grey
        }
      }
    }
  )
);
