import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar
} from "react-native";
import { Colors } from "../themes";

export default class MoreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: null
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor: Colors.grey }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey }}>
          <Text>Soon ...</Text>
        </SafeAreaView>
      );
    }
  }
}
