import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SliderEntry.style";

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    parallaxProps: PropTypes.object
  };

  get image() {
    const { data, parallaxProps } = this.props;

    return (
      <ParallaxImage
        source={{ uri: data }}
        containerStyle={[styles.imageContainer]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor="rgba(0, 0, 0, 0.25)"
        {...parallaxProps}
      />
    );
  }

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {}}
      >
        <View style={[styles.imageContainer]}>{this.image}</View>
      </TouchableOpacity>
    );
  }
}
