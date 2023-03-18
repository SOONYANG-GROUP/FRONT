import React from "react";

const RoadmapCard = ({
    roadmap
}) => {
    return(
        <div className="col-md-4">
            <div className="card mb-4 box-shadow">
            <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">9 mins</small>
                </div>
            </div>
            </div>
        </div>
    )
}

const RoadmapCards = ({
    roadmaps
}) => {
    return(
        <div className="album py-5 bg-light">
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
        </div>
    )
}

export default RoadmapCards;