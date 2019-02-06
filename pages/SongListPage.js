import React from "react";
import { Text } from "react-native";
import Permissions from "react-native-permissions";
const RNFS = require("react-native-fs");

export default class SongListPage extends React.Component {
  state = {
    songs: []
  }

  componentDidMount() {
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
      
    console.log(allFiles)

    this.setState({
      songs: allFiles
    })
  }

  mapSongs () {
    return this.state.songs.map(song => <Text key={song.path}>{song.name}</Text>)
  }

  render() {
    return this.mapSongs();
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
         await getFilesByExtension(item.path, extension)
      }
    }
  }
}
