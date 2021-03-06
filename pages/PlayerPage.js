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
    isPlaying: false,
    isMovingTheSlider: false,
    progress: 0
  };

  componentDidMount() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);

    this.player = new PlayerSound(path, {
      autoDestroy: true,
      continuesToPlayInBackground: true
    });
    this.player.wakeLock = true;

    this.player.play(err => {
      if (err) {
        console.log(err);
      } else {
        this.setState({ isPlaying: true });
      }
    });

    this.lastSeek = 0;
    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        // && !this._dragging) {
        this.setState({
          progress: Math.max(0, this.player.currentTime) / this.player.duration
        });
      }
    }, 100);

    this.player.on("ended", () => {
      this.navigateToNextSong();
    });
  }

  componentWillUnmount() {
    this.player.destroy();
    clearInterval(this._progressInterval);
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return !this.state.isMovingTheSlider && Date.now() - this.lastSeek > 200;
  }

  togglePlay = () => {
    if (this.state.isPlaying === true) {
      this.player.pause();
      this.setState({ isPlaying: false });
    } else {
      this.player.play();
      this.setState({ isPlaying: true });
    }
  };

  navigateToNextSong = () => {
    this.props.navigation.replace("PlayerPage", this.props.nextSong);
  };

  navigateToPrevSong = () => {
    this.props.navigation.replace("PlayerPage", this.props.previousSong);
  };

  onSliderChange = value => {
    this.player.seek(value * this.player.duration, () => {
      this.setState({ progress: value, isMovingTheSlider: false });
    });
    
  };

  onSlidingStart = () => {
    this.setState({ isMovingTheSlider: true });
  };

  render() {
    const { navigation } = this.props;
    const path = navigation.getParam("path", null);
    const name = navigation.getParam("name", "No Name");

    return (
      <Player
        isPlaying={this.state.isPlaying}
        togglePlay={this.togglePlay}
        onNext={this.navigateToNextSong}
        onPrev={this.navigateToPrevSong}
        sliderValue={this.state.progress}
        onSliderChange={this.onSliderChange}
        onSlidingStart={this.onSlidingStart}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { navigation } = ownProps;
  const currentPath = navigation.getParam("path", null);

  const currentIndex = state.songs.findIndex(song => song.path === currentPath);

  let nextIndex = null;
  let previousIndex = null;

  if (currentIndex === 0) {
    nextIndex = 1;
    previousIndex = state.songs.length - 1;
  } else if (currentIndex === state.songs.length - 1) {
    nextIndex = 0;
    previousIndex = currentIndex - 1;
  } else {
    nextIndex = currentIndex + 1;
    previousIndex = currentIndex - 1;
  }

  return {
    previousSong: state.songs[previousIndex],
    nextSong: state.songs[nextIndex]
  };
}

export default connect(mapStateToProps)(PlayerPage);
