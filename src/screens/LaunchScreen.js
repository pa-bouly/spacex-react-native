import React from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import CountDown from "react-native-countdown-component";

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
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      var todayDate = new Date();
      var launchDate = new Date(this.state.dataSource.launch_date_utc);
      var secondsRemaining =
        (launchDate.getTime() - todayDate.getTime()) / 1000;

      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Next Launch</Text>
          <Text style={styles.subtitle}>
            {this.state.dataSource.mission_name}
          </Text>
          <CountDown
            until={secondsRemaining}
            onFinish={() => alert("finished")}
            onPress={() => alert("hello")}
            size={20}
          />
        </SafeAreaView>
      );
    }
  }
}
export const COLOR_PRIMARY = "#1d74f5";
export const COLOR_BORDER = "#e1e5e8";
export const COLOR_WHITE = "#fff";

const colors = {
  backgroundPrimary: COLOR_PRIMARY,
  backgroundSecondary: "white",

  textColorPrimary: "white",
  textColorSecondary: COLOR_PRIMARY,

  borderColorPrimary: COLOR_PRIMARY,
  borderColorSecondary: COLOR_BORDER
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLOR_BORDER
  },
  title: {
    letterSpacing: 0,
    fontSize: 24,
    alignSelf: "center",
    marginVertical: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#54585E",
    alignSelf: "center",
    marginVertical: 4
  }
});
