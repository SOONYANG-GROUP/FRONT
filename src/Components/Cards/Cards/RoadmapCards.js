import React from "react";

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="col-md-3 animate__animated animate__fadeIn">
      <a href={`/roadmap/${roadmap._id}`}>
        <div
          className="card shadow-lg mb-3"
          style={{
            background: `url(${roadmap.imageSecureUrl})`,
            height: "310px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid white",
          }}
        ></div>
      </a>
    </div>
  );
};

const RoadmapCards = ({ roadmaps }) => {
  return (
    <div className="album py-5">
      <div className="container">
        <div className="row">
          {roadmaps.map((roadmap, index) => {
            return <RoadmapCard key={index} roadmap={roadmap} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default RoadmapCards;
