import React from "react";
import { Text } from "react-native";
import Player from "./playerPage/Player";

export default class PlayerPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", "No Name")
    };
  };

  render() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);
    const name = navigation.getParam("name", "No Name");
    return (
      <Player />
    );
  }
}
