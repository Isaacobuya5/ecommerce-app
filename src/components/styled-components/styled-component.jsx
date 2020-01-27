import React from "react";
import styled from "styled-components";

import Card from "./card-component";

const Text = styled.div`
  color: red;
  font-size: 24px;
  border: ${({ isActive }) =>
    isActive ? "1px solid black" : "2px dotted green"};
`;

function Display() {
  return (
    <div className="display">
      <Card>
        <Text isActive={false}>I am a Component</Text>
      </Card>
    </div>
  );
}

export default Display;
