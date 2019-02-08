import React from "react";
import { Text } from "react-native";
import Player from "./playerPage/Player";
import { Player as PlayerSound } from "react-native-audio-toolkit";

export default class PlayerPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", "No Name")
    };
  };

  state = {
    isPlaying: false
  };

  componentDidMount() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);

    this.sound = new PlayerSound(path, {
      autoDestroy: true,
      continuesToPlayInBackground: true
    }).play(err => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ isPlaying: true });
      }
    });
  }

  componentWillUnmount () {
    this.sound.destroy();
  }

  render() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);
    const name = navigation.getParam("name", "No Name");
    return <Player />;
  }
}
