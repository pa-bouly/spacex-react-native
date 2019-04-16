import React from "react";
import { Text, View, ActivityIndicator, ScrollView, Image } from "react-native";

export default class ShipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const shipId = this.props.navigation.getParam("ship_id", "MRSTEVEN");

    return fetch("https://api.spacexdata.com/v3/ships/" + shipId)
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
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={{ uri: this.state.dataSource.image }}
            style={{ width: 200, height: 200 }}
          />

          <Text>{this.state.dataSource.ship_name}</Text>
        </View>
      );
    }
  }
}
