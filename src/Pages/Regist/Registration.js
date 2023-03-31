import React, { useState } from "react";
import FieldList from "../../Components/List/FieldList";
import { FieldSelectTag } from "../../Components/Inputs/Select";
import { FieldLists } from "../../Components/Constants/Lists";
import axios from "axios";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [shortIntroduction, setShortIntroduction] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      "Submitting form",
      name,
      email,
      password,

      shortIntroduction,
      selfIntroduction
    );
  };

  const onClickLogin = async () => {
    let data = {
      password: password,
      email: email,
      name: name,
      detailField: selectedField,
      shortIntroduction: shortIntroduction,
      selfIntroduction: selfIntroduction,
    };
    console.log(data);
    // await axios
    //   .post("http://localhost:8080/users/join", data)
    //   .then((res) => console.log(res))
    //   .catch();
    // window.location.assign("/");
  };

  return (
    <div className="glass-container">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-lg-6 col-md-8 col-sm-10">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-5">
                <h1 className="text-center mb-4">Member Registration</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <label htmlFor="name">Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="email">Email address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="form-floating mb-3">
                    <div class="form-floating">
                      <select
                        class="form-select"
                        id="floatingSelect"
                        aria-label="Floating label select example"
                        onChange={(e) => setSelectedField(e.target.value)}
                      >
                        <option selected>select your field</option>
                        {FieldLists.map((f) => {
                          return <option value={f}>{f}</option>;
                        })}
                      </select>
                      <label for="floatingSelect">Works with selects</label>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="shortIntroduction"
                      placeholder="shortIntroduction"
                      value={shortIntroduction}
                      onChange={(e) => setShortIntroduction(e.target.value)}
                      required
                    />
                    <label htmlFor="shortIntroduction">shortIntroduction</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="selfIntroduction"
                      placeholder="selfIntroduction"
                      value={selfIntroduction}
                      onChange={(e) => setSelfIntroduction(e.target.value)}
                      required
                      style={{ height: "200px" }}
                    />
                    <label htmlFor="selfIntroduction">selfIntroduction</label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    onClick={onClickLogin}
                  >
                    Submit
                  </button>
                </form>
                <p className="text-muted text-center mb-0">
                  Already a member? <a href="!#">Log in</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
