import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";

export default class DragonsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    return fetch("https://api.spacexdata.com/v3/dragons")
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

  renderDragons() {
    return this.state.dataSource.map(item => {
      return (
        <View style={{ borderColor: "black" }} key={item.id}>
          <TouchableHighlight
            onPress={() => {
              this.props.navigation.navigate("DragonDetailsScreen", {
                dragon_id: item.id
              });
            }}
          >
            <View style={styles.button}>
              <Image
                source={{ uri: item.flickr_images[0] }}
                style={{ height: 200 }}
              />
              <Text style={styles.buttonText}>{item.name}</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
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
      return <ScrollView>{this.renderDragons()}</ScrollView>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: "center"
  },
  button: {
    marginBottom: 30
  },
  buttonText: {
    padding: 20,
    color: "#005288"
  }
});
