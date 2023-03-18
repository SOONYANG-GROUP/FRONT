import React from "react";

const RoadmapCard = ({
    id,
    roadmap
}) => {
    return(
        <div className="col-xl-3 col-lg-4 col-md-6 mb-5">
            <a 
                href={`/roadmap/${id}`} 
                className="card lift h-100 shadow-sm p-3 mb-5 bg-body-tertiary rounded"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none"
                }}    
            >
                <div className="text-center text-dark-emphasis">
                    <i className={`${roadmap.iconClassName} mb-4`}></i>
                    <h6>{roadmap.roadmap}</h6>
                </div>
            </a>
        </div>
    )
}

const RoadmapCards = ({
    roadmaps
}) => {
    console.log(roadmaps)
    return(
        <section className="py-10">
            <div className="container">
                <div className="row">
                    {roadmaps.map((roadmap, index) => {
                        return(
                            <RoadmapCard 
                                key={index}
                                roadmap={roadmap}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default RoadmapCards;