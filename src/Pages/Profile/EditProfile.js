import React, { useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [detailField, setDetailField] = useState();

  const [selfIntroduction, setSelfIntroduction] = useState();

  const [shortIntroduction, setShortIntroduction] = useState();

  const onChangeDetailField = (e) => {
    setDetailField(e.target.value);
  };
  const onChangeSelfIntroduction = (e) => {
    setSelfIntroduction(e.target.value);
  };
  const onChangeShortIntroduction = (e) => {
    setShortIntroduction(e.target.value);
  };

  const onSubmitBtn = async () => {
    let data = {
      detailField: detailField,
      selfIntroduction: selfIntroduction,
      shortIntroduction: shortIntroduction,
    };
    await axios
      .post("http://localhost:8080/users/edit", data)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  };

  return (
    <>
      <div>
        <input placeholder="자기 분야" onChange={onChangeDetailField}></input>
        <input
          placeholder="자기소개"
          onChange={onChangeSelfIntroduction}
        ></input>
        <input
          placeholder="대표문구"
          onChange={onChangeShortIntroduction}
        ></input>
      </div>
      <button onClick={onSubmitBtn}>제출</button>
    </>
  );
};

export default EditProfile;
