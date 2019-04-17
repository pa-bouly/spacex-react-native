import React from "react";
import {
  Text,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { Colors } from "../../themes";
export default class StarshipsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const items = [
      {
        icon: "rocket",
        name: "Rockets",
        url: "RocketsScreen"
      },
      {
        icon: "rocket",
        name: "Dragons",
        url: "DragonsScreen"
      },
      {
        icon: "rocket",
        name: "Ships",
        url: "ShipsScreen"
      },
      {
        icon: "rocket",
        name: "Pads",
        url: "PadsScreen"
      }
    ];
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.grey }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.list}>
            {items.map((item, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    this.props.navigation.navigate(item.url);
                  }}
                  style={styles.item}
                >
                  <Icon name={item.icon} size={25} color={"white"} />
                  <Text style={{ color: "white" }}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  title: {
    letterSpacing: 0,
    fontSize: 24,
    alignSelf: "center",
    marginVertical: 8
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10
  },
  item: {
    backgroundColor: "black",
    marginVertical: 10,
    marginHorizontal: 5,
    height: 100,
    width: windowWidth / 2 - 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  contentContainer: {
    flexGrow: 1
  }
});
