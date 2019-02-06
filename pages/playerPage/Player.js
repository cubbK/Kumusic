import React from "react";
import { View, StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";

export default class Player extends React.Component {
  render() {
    return (
      <View>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.linearGradient}
        />
        {this.props.children}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  linearGradient: {
    width: "65%",
    paddingBottom: "65%",
    height: 0,
    margin: "auto",
  }
});
