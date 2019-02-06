import React from "react";
import { Text } from "react-native";

export default class PlayerPage extends React.Component {
  static navigationOptions = {
    title: "Player"
  };
  render() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);
    const name = navigation.getParam("name", "No Name");
    return (
      <Text>
        {path} || {name}
      </Text>
    );
  }
}
