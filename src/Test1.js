import React from "react";

import axios from "axios";

const Test1 = () => {
  const onClickTest = async (e) => {
    e.preventDefault();
    await axios
      .get("http://54.235.56.169/projects")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`err in test1: ${err}`);
      });
  };

  return (
    <div>
      <button onClick={onClickTest}>Click Test</button>
    </div>
  );
};

export default Test1;
