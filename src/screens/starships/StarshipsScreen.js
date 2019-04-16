import React from "react";
import { Text, View, ScrollView, Button } from "react-native";

export default class StarshipsScreen extends React.Component {
  render() {
    return (
      <ScrollView>
        <Button
          title="Rockets"
          onPress={() => this.props.navigation.push("RocketsScreen")}
        />
        <Button
          title="Dragons"
          onPress={() => this.props.navigation.navigate("DragonsScreen")}
        />
        <Button
          title="Ships"
          onPress={() => this.props.navigation.navigate("ShipsScreen")}
        />
      </ScrollView>
    );
  }
}
