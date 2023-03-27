import React from "react";

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="col-md-4">
      <a
        href={`/roadmap/${roadmap._id}`}
        style={{ textDecoration: "none" }}
        className="text-black shadow-sm"
      >
        <div className="card mb-4 box-shadow">
          <div className="card-body p-5">
            <h4 className="text-center">
              <img 
                src={roadmap.imageSecureUrl} 
                alt="roadmap"
                style={{
                  width: "100%"
                }}  
              />
            </h4>
            <h5 className="card-text text-center mt-4">{roadmap.name}</h5>
            <div className="d-flex justify-content-between align-items-center"></div>
          </div>
        </div>
      </a>
    </div>
  );
};

const RoadmapCards = ({ roadmaps }) => {
  console.log(roadmaps)
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
