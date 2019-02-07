import React from "react";
import styled from "styled-components/native";
import CoolBox from "./player/CoolBox";
import { lighten } from "polished";
import { Icon } from "native-base";
import { Button } from "native-base";

const Container = styled.View`
  background-color: #222;
  height: 100%;
`;

const Controls = styled.View`
  width: 100%;
  height: 80px;
  border-top-color: ${lighten(0.03, "#222")};
  border-top-width: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const PlayButton = styled(Button)`
  align-self: center;
  width: 60px;
  height: 60px;
  border-radius: 50;
  border-color: #fafafa;
  border-width: 1px;
  display: flex;
  justify-content: center;
`;

const ChangeSongButton = styled(Button)`
  align-self: center;
  width: 50px;
  height: 50px;
  border-radius: 50;
  border-color: #fafafa;
  border-width: 1px;
  display: flex;
  justify-content: center;
`;

const PlayIcon = styled(Icon)`
  font-size: 40px;
  color: #fafafa;
  margin: auto;
`;

const PrevIcon = styled(Icon)`
  font-size: 30px;
  color: #fafafa;
  margin: auto;
`;

export default class Player extends React.Component {
  render() {
    return (
      <Container>
        <CoolBox />
        <Controls>
          <ChangeSongButton onPress={this.props.onPrev} bordered rounded>
            <PrevIcon active name="skip-previous" type="MaterialIcons" />
          </ChangeSongButton>
          <PlayButton onPress={this.props.onPlay} bordered rounded>
            <PlayIcon active name="play-arrow" type="MaterialIcons" />
          </PlayButton>
          <ChangeSongButton onPress={this.props.onNext} bordered rounded>
            <PrevIcon active name="skip-next" type="MaterialIcons" />
          </ChangeSongButton>
        </Controls>
      </Container>
    );
  }
}
