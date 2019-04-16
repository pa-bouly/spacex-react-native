import React from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

export default class LaunchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("https://api.spacexdata.com/v3/launches/next")
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      console.log(this.state.dataSource);
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Home!</Text>
          <Text>{this.state.dataSource.mission_name}</Text>
        </View>
      );
    }
  }
}
