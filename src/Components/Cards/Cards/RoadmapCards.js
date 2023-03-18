import React from "react";

const RoadmapCard = ({
    roadmap
}) => {
    return(
        <div className="col-lg-4 mb-5 mb-lg-0 mt-3">
            <a className="card lift h-100 text-secondary shadow-sm p-3 bg-body-tertiary rounded text-center" href="#!" style={{textDecoration: "none"}}>
                <div className="card-body">
                    <h3 className="text-primary mb-0 text-dark p-3">
                        <i className={roadmap.iconClassName}></i>
                    </h3>
                    <div className="small text-gray-800 fw-500 mt-3">{roadmap.roadmap}</div>
                    <div className="small text-gray-500">평균 연봉 {roadmap.averageSalary}</div>
                </div>
            </a>
        </div>
    )
}

const RoadmapCards = ({
    roadmaps
}) => {
    return(
        <section className="bg-white py-10">
            <div className="container px-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 className="mb-0">Recent Roadmaps</h2>
                    <a className="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">
                        See more
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right ms-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
                <div className="row gx-5">
                    {roadmaps.map((roadmap, index) => {
                        return(
                            <RoadmapCard 
                                roadmap={roadmap}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default RoadmapCards;