import React from "react";
import { Rnd } from "react-rnd";
import "./Example.css";

const Example = () => {
  return (
    <>
      <Rnd
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200,
        }}
        className="rnd-border"
      >
        Rnd
      </Rnd>
    </>
  );
};

export default Example;
