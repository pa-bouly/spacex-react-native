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
import LinearGradient from "react-native-linear-gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";

import SliderEntry from "../../components/SliderEntry";
import { sliderWidth, itemWidth } from "../../styles/SliderEntry.style";

export default class RocketDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      sliderActiveSlide: 0
    };
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

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return <SliderEntry data={item} parallaxProps={parallaxProps} />;
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{ x: 1, y: 0 }}
        endPoint={{ x: 0, y: 1 }}
        style={styles.gradient}
      />
    );
  }

  render() {
    const { sliderActiveSlide, dataSource } = this.state;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* <StatusBar
              translucent={true}
              backgroundColor={"rgba(0, 0, 0, 0.3)"}
              barStyle={"light-content"}
            /> */}
            {this.gradient}
            <ScrollView
              style={styles.scrollview}
              scrollEventThrottle={200}
              directionalLockEnabled={true}
            >
              <View style={styles.carouselContainer}>
                <Text style={styles.title}>{dataSource.rocket_name}</Text>
                <Carousel
                  ref={c => (this._slider1Ref = c)}
                  data={dataSource.flickr_images}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  containerCustomStyle={styles.slider}
                  loop={true}
                  onSnapToItem={index =>
                    this.setState({ sliderActiveSlide: index })
                  }
                />
                <Pagination
                  dotsLength={dataSource.flickr_images.length}
                  activeDotIndex={sliderActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={"rgba(255, 255, 255, 0.92)"}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  }
}

export const colors = {
  black: "#1a1917",
  background1: "#141e30",
  background2: "#243b55"
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  title: {
    paddingHorizontal: 30,

    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  carouselContainer: {
    paddingVertical: 30
  },
  slider: {
    marginTop: 15
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});
