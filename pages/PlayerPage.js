import React from "react";
import { Text } from "react-native";
import Player from "./playerPage/Player";
import { Player as PlayerSound } from "react-native-audio-toolkit";
import { connect } from "react-redux";

class PlayerPage extends React.Component {
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

    this.player = new PlayerSound(path, {
      autoDestroy: true,
      continuesToPlayInBackground: true
    })

    this.player.play(err => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ isPlaying: true });
      }
    });

  }

  componentWillUnmount () {
    this.player.destroy();
  }

  togglePlay = () => {
    if (this.state.isPlaying === true) {
      this.player.pause();
      this.setState({isPlaying: false})
    } else {
      this.player.play()
      this.setState({isPlaying: true})
    }
  }

  render() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);
    const name = navigation.getParam("name", "No Name");

    console.log("previous player: ", this.props.previousPlayer)
    return <Player isPlaying={this.state.isPlaying} togglePlay={this.togglePlay}/>;
  }
}


export default (PlayerPage)