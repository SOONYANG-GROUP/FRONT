import React from "react";

const RoadmapCard = ({ roadmap }) => {
  console.log(roadmap);
  return (
    <div
      class="col-lg-4 col-md-6 mb-5 aos-init aos-animate components"
      data-aos="fade-up"
    >
      <a
        class="card text-center text-decoration-none h-100 lift text-secondary"
        href={`http://localhost:3002/roadmap/${roadmap._id}`}
      >
        <div class="card-body py-5">
          <div class="icon-stack icon-stack-lg bg-green-soft text-green mb-4">
            <i class={roadmap.iconClassName}></i>
          </div>
          <h5>{roadmap.roadmap}</h5>
          <p class="card-text small">{roadmap.shortDescription}</p>
        </div>
      </a>
    </div>
  );
};

const RoadmapCards = ({ roadmaps }) => {
  return (
    <div className="album py-5 bg-light">
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
