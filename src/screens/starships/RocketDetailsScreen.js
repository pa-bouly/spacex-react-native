import React from "react";
import { Text, View, ActivityIndicator, ScrollView, Image } from "react-native";

export default class RocketDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    const rocketId = this.props.navigation.getParam("rocket_id", "falcon9");

    return fetch("https://api.spacexdata.com/v3/rockets/" + rocketId)
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
            source={{ uri: this.state.dataSource.flickr_images[0] }}
            style={{ width: 200, height: 200 }}
          />

          <Text>{this.state.dataSource.rocket_name}</Text>
        </View>
      );
    }
  }
}
