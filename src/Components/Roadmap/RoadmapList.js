import RoadmapElement from "./RoadmapElement";

const RoadmapList = () => {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="true"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner" style={{ marginBottom: "40px" }}>
        <div class="carousel-item active">
          <div class="row">
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
            <div class="col">
              <RoadmapElement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapList;
