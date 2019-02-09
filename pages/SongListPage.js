import React from "react";

import Permissions from "react-native-permissions";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Right,
  Title,
  Left,
  Body,
  Button
} from "native-base";
const RNFS = require("react-native-fs");
import { connect } from "react-redux";
import { setSongs } from "../redux/actions";

class SongListPage extends React.Component {
  static navigationOptions = {
    title: "Music library"
    /* No more header config here! */
  };
  componentDidMount() {
    Permissions.request("storage").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ storagePermission: response });
      this.getFiles();
    });
  }

  async getFiles() {
    const allFiles = await getAllFilesByExtension("/storage/emulated/0/", [
      ".mp3",
      ".m4a"
    ]);

    this.props.setSongs(allFiles);
  }

  mapSongs() {
    return this.props.songs.map(song => (
      <CardItem
        key={song.path}
        button
        onPress={() =>
          this.props.navigation.navigate("PlayerPage", {
            path: song.path,
            name: song.name
          })
        }
      >
        <Icon active name="music-note" type="MaterialIcons" />
        <Text>{song.name}</Text>
      </CardItem>
    ));
  }

  render() {
    if (this.props.songs.length === 0) {
      return (
        <Container>
          <Content>
            <Card>
              <CardItem>
                <Icon active name="hourglass-empty" type="MaterialIcons" />
                <Text>Searching for audio files...</Text>
              </CardItem>
            </Card>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <Content>
          <Card>{this.mapSongs()}</Card>
        </Content>
      </Container>
    );
  }
}

async function getAllFilesByExtension(startingPath, extension) {
  let files = [];
  await getFilesByExtension(startingPath, extension);
  return files;

  // recursive function
  async function getFilesByExtension(path, extensionsToCheck) {
    const result = await RNFS.readDir(path);

    // For each children file or folder of result
    for (item of result) {
      if (
        item.isFile() &&
        hasFileTheRightExtension(item.name, extensionsToCheck)
      ) {
        files.push({
          name: item.name,
          path: item.path
        });
      } else if (item.isDirectory()) {
        // run the same function recursively, only with the children path as root
        await getFilesByExtension(item.path, extension);
      }
    }
  }

  function hasFileTheRightExtension(fileName, extensionsToCheck) {
    const fileNameLastLettersList = extensionsToCheck.map(extensionToCheck =>
      fileName.slice(-1 * extensionToCheck.length)
    );

    for (const fileNameLastLetters of fileNameLastLettersList) {
      if (extensionsToCheck.includes(fileNameLastLetters)) {
        return true;
      }
    }

    return false;
  }
}

export default connect(
  store => ({ songs: store.songs }),
  { setSongs }
)(SongListPage);
