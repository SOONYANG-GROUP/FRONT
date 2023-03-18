import React from "react";

const RoadmapCard = ({
    id,
    roadmap
}) => {
    return(
        <div className="col-xl-3 col-lg-4 col-md-6 mb-5">
            <a href={`/roadmap/${id}`}>
                <div>
                    <h4>{roadmap.title}</h4>
                </div>
            </a>
        </div>
    )
}

const RoadmapCards = ({
    roadmaps
}) => {
    return(
        <section className="py-10 bg-light">
            <div className="container">
                <h2 className="mb-4">Recent Projects</h2>
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