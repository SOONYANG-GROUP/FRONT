import React, { useState } from "react";

export const ProblemSection = ({
    skill,
    studyTip
}) => {
    
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5 pb-5">
            <h4></h4>
            <div>
                <pre>
                    {studyTip}
                </pre>
            </div>
        </div>
    )
}