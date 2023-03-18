import React from "react";

const ProjectCard = ({
    project
}) => {
    return(
        <div class="col-lg-4 mb-5 mb-lg-0">
            <a class="card lift h-100" href="#!">
                <div class="card-flag card-flag-dark card-flag-top-right">Listed 1 month</div>
                <img class="card-img-top" src="https://source.unsplash.com/YOoucEImrKw/800x500" alt="..." />
                <div class="card-body">
                    <h3 class="text-primary mb-0">$678,999</h3>
                    <div class="small text-gray-800 fw-500">4 bd | 3 ba | 1,820 sqft</div>
                    <div class="small text-gray-500">Picsard, GA</div>
                </div>
                <div class="card-footer bg-transparent border-top d-flex align-items-center justify-content-between">
                    <div class="small text-gray-500">View listing</div>
                    <div class="small text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></div>
                </div>
            </a>
        </div>
    )
}

const ProjectCards = ({
    projects
}) => {
    return(
        <section className="bg-white py-10">
            <div className="container px-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2 class="mb-0">Featured Listings</h2>
                    <a class="btn btn-sm btn-primary d-inline-flex align-items-center" href="#!">
                        See more
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right ms-1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                </div>
                <div class="row gx-5">
                    {projects.map((project, index) => {
                        return(
                            <ProjectCard 
                                project={project}
                                key={index}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default ProjectCards;