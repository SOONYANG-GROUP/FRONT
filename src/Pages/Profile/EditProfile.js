import React, { useState } from "react";
import axios from "axios";
import { BACK_URL } from "../../Components/Constants/URL";

const EditProfile = () => {
  const [detailField, setDetailField] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [shortIntroduction, setShortIntroduction] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      detailField,
      selfIntroduction,
      shortIntroduction,
    };
    try {
      const response = await axios.post(`${BACK_URL}/users/edit`, data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    // window.history.go(-1);
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container p-5 shadow-lg rounded-lg bg-white">
        <h1 className="text-center mb-4">Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="detailField" className="form-label">
              Detail Field
            </label>
            <input
              type="text"
              className="form-control border-0 border-bottom border-dark"
              id="detailField"
              placeholder="Enter your detail field"
              value={detailField}
              onChange={(event) => setDetailField(event.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="selfIntroduction" className="form-label">
              Self Introduction
            </label>
            <textarea
              className="form-control border-0 border-bottom border-dark"
              id="selfIntroduction"
              rows="5"
              placeholder="Enter your self introduction"
              value={selfIntroduction}
              onChange={(event) => setSelfIntroduction(event.target.value)}
            ></textarea>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="shortIntroduction" className="form-label">
              Short Introduction
            </label>
            <input
              type="text"
              className="form-control border-0 border-bottom border-dark"
              id="shortIntroduction"
              placeholder="Enter your short introduction"
              value={shortIntroduction}
              onChange={(event) => setShortIntroduction(event.target.value)}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary px-5">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
