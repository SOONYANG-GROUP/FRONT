import React from "react";

import axios from "axios";

const Test1 = () => {
  const onClickTest = async (e) => {
    e.preventDefault();
    await axios
      .get("https://52.91.214.195/projects")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`err in test1: ${err}`);
      });
  };

  return (
    <>
      <div>
        <button onClick={onClickTest}>Click Test</button>
      </div>
    </>
  );
};

export default Test1;
