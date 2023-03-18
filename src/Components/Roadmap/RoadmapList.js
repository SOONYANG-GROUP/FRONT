import RoadmapElement from "./RoadmapElement";

const RoadmapList = () => {
  return (
    <div id="Roadmap" className="carousel slide" data-bs-ride="true">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#Roadmap"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
          style={{ backgroundColor: "gray" }}
        ></button>
        <button
          type="button"
          data-bs-target="#Roadmap"
          data-bs-slide-to="1"
          aria-label="Slide 2"
          style={{ backgroundColor: "gray" }}
        ></button>
        <button
          type="button"
          data-bs-target="#Roadmap"
          data-bs-slide-to="2"
          aria-label="Slide 3"
          style={{ backgroundColor: "gray" }}
        ></button>
      </div>
      <div className="carousel-inner" style={{ marginBottom: "100px" }}>
        <div className="carousel-item active">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 "
            style={{ marginBottom: "50px" }}
          >
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 "
            style={{ marginBottom: "50px" }}
          >
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div
            className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 "
            style={{ marginBottom: "50px" }}
          >
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
            <div className="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapList;
