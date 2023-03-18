import React, { useEffect, useState } from "react";
import Ezreal from "../../Images/00038-797135021.png";

const Summoners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <>
        <img
          class="rounded mx-auto d-block"
          src={Ezreal}
          alt="..."
          width="20%"
        />
      </>

      <div class="p-4 w-50 input-group input-group-lg mb-3 mx-auto">
        <input
          type="text"
          class="form-control"
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default Summoners;
