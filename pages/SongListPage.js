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
  componentDidMount() {
    Permissions.request("storage").then(response => {
      // Returns once the user has chosen to 'allow' or to 'not allow' access
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ storagePermission: response });
    });

    this.getFiles();
  }

  async getFiles() {
    const mp3Files = await getAllFilesByExtension(
      "/storage/emulated/0/",
      ".mp3"
    );
    const m4aFiles = await getAllFilesByExtension(
      "/storage/emulated/0/",
      ".m4a"
    );

    const allFiles = await [...mp3Files, ...m4aFiles];

    this.props.setSongs(allFiles);
  }

  mapSongs() {
    return this.props.songs.map(song => (
      <CardItem key={song.path} button onPress={() => alert("This is Card Header")}>
        <Icon active name="music-note" type="MaterialIcons"/>
        <Text>{song.name}</Text>
      </CardItem>
    ));
  }

  render() {
    if (this.props.songs.length === 0) {
      return <Text>Loading...</Text>;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Kumusic</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Card>{this.mapSongs()}</Card>
        </Content>
      </Container>
    );
  }
}

async function getAllFilesByExtension(startingPath, extension) {
  let files = [];

  try {
    await getFilesByExtension(startingPath, extension);
    return files;
  } catch (err) {
    console.log(err);
  }

  // recursive function
  async function getFilesByExtension(path, extension) {
    const result = await RNFS.readDir(path);

    for (item of result) {
      const itemExtension = item.name.slice(-1 * extension.length);
      if (item.isFile() && itemExtension === extension) {
        files.push({
          name: item.name,
          path: item.path
        });
      } else if (item.isDirectory()) {
        await getFilesByExtension(item.path, extension);
      }
    }
  }
}

export default connect(
  store => ({ songs: store.songs }),
  { setSongs }
)(SongListPage);
