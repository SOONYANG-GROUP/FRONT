import React, { useState } from "react";

const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [shortIntroduction, setShortIntroduction] = useState("");
  const [introduction, setIntroduction] = useState("");

  const onChangeShortIntroduction = (e) => {
    setShortIntroduction(e.target.value);
  };

  const onChangeIntroduction = (e) => {
    setIntroduction(e.target.value);
  };

  const onEditProfile = (e) => {
    e.preventDefault();
  };
};

export default EditProfile;
