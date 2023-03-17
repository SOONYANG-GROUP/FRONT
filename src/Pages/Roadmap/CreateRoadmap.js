import React, { useEffect, useState } from "react";
import { RoadmapPartInput } from "../../Components/Inputs";

import Loading from "../Loading";

const CreateRoadmap = () => {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ addingRoadmap, setAddingRoadmap ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ introduction, setIntroduction ] = useState("");
    
    const [ roadmapTitle, setRoadmapTitle ] = useState("");
    const [ roadmapDescription, setRoadmapDescription ] = useState("");

    const [ roadmaps, setRoadmaps ] = useState([]);

    let _id = 0;

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeRoadmapTitle = (e) => {
        setRoadmapTitle(e.target.value);
    }

    const onChangeIntroduction = (e) => {
        setIntroduction(e.target.value);
    }

    const onChangeRoadmapDescription = (e) => {
        setRoadmapDescription(e.target.value);
    }

    const onClickRoadmap = async (e) => {
        e.preventDefault();
        await setAddingRoadmap(true);
        let roadmap = {
            _id,
            title: roadmapTitle,
            description: roadmapDescription
        };
        roadmaps.push(roadmap);
        await setAddingRoadmap(false);
    }

    if(isLoading)
    {
        return(<Loading />)
    }
    else
    {
        return(
            <div>
                <div>
                    <input 
                        type="text"
                        name="title"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </div>
                <div>
                    <textarea
                        name="introduction"
                        value={introduction}
                        onChange={onChangeIntroduction}
                    >
                    </textarea>
                </div>
                <div>
                    <div>
                        {addingRoadmap ? (<></>) : (
                            roadmaps.map((roadmapElement, index) => {
                                return(
                                    <div key={index}>
                                        <div>
                                            {roadmapElement.title}
                                        </div>
                                        <div>
                                            {roadmapElement.description}
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <div>
                        <RoadmapPartInput 
                            roadmapTitle={roadmapTitle}
                            roadmapDescription={roadmapDescription}
                            onClickRoadmap={onClickRoadmap}
                            onChangeRoadmapTitle={onChangeRoadmapTitle}
                            onChangeRoadmapDescription={onChangeRoadmapDescription}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateRoadmap;