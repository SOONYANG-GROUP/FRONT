import { useState } from "react"

export const TitleInput = ({title, onChangeTitle}) => {
    return(
        <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeTitle}
        />
    )
}

export const DescriptionInput = ({
    description, 
    onChangeDescription
}) => {
    return(
        <textarea
            name="description"
            value={description}
            onChange={onChangeDescription}
        ></textarea>
    )
}

export const TechsInput = ({
    onChangeTechs
}) => {
    return(
        <select onChange={onChangeTechs}>

        </select>
    )
}

export const RegionInput = ({
    onChangeRegion
}) => {
    return(
        <select onChange={onChangeRegion}>
            <option
                value="온라인/오프라인 모두 가능"
            >온라인/오프라인 모두 가능</option>
            <option
                value="온라인만 가능"
            >온라인만 가능</option>
            <option
                value="오프라인만 가능"
            >오프라인만 가능</option>
        </select>
    )
}

export const TechInput = ({
    tech,
    onChangeTech
}) => {
    return(
        <input 
            type="text"
            name="tech"
            value={tech}
            onChange={onChangeTech}
            placeholder="예) Java, React, Python"
        />
    )
}

export const RoadmapPartInput = ({
    roadmapTitle,
    roadmapDescription,
    onClickRoadmap,
    onChangeRoadmapTitle,
    onChangeRoadmapDescription
}) => {
    return(
        <div>
            <div>
                <input 
                    type="text"
                    name="title"
                    value={roadmapTitle}
                    onChange={onChangeRoadmapTitle}
                />
            </div>
            <div>
                <textarea
                    name="description"
                    value={roadmapDescription}
                    onChange={onChangeRoadmapDescription}
                >
                </textarea>
            </div>
            <div>
                <button onClick={onClickRoadmap}>
                    roadmap 추가하기
                </button>
            </div>
        </div>
    )
}