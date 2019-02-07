import React from "react";
import styled from "styled-components/native";
import CoolBox from "./player/CoolBox";

const Container = styled.View`
  background-color: #222;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default class Player extends React.Component {
  render() {
    return (
      <Container>
        <CoolBox />
      </Container>
    );
  }
}
