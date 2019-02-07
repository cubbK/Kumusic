import React from "react";
import styled, { css } from "styled-components/native";
import LinearGradient from "react-native-linear-gradient";
import { StyleSheet } from "react-native";
import { Icon } from "native-base";

const Square = styled.View`
  background: red;
  width: 70%;
  padding-bottom: 70%;
  height: 0;
  margin: auto;
  position: relative;
`;

const MusicIcon = styled(Icon)`
  font-size: 130px;
  margin: auto;
  color: #222;
`;

const CoolBox = () => (
  <Square>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={["#9AF280", "#FFD85B"]}
      style={styles.linearGradient}
    />
    <MusicIcon active name="music-note" type="MaterialIcons"  />
  </Square>
);

var styles = StyleSheet.create({
  linearGradient: {
    width: "100%",
    paddingBottom: "100%",
    height: 0,
    margin: "auto"
  }
});

export default CoolBox;
