import React from "react";
import styled from "styled-components";
import Switch from "react-switch";

export const MuteSwitch = ({
  onSwitch,
  mute,
}: {
  onSwitch: (state: boolean) => void;
  mute: boolean;
}) => {
  return (
    <Container style={{ margin: 5 }}>
      Play sound:{" "}
      <div style={{ paddingLeft: 5 }}>
        <Switch checked={mute} onChange={() => onSwitch(mute)} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
`;
