import React from "react";
import SkillList from "../List/SkillList";
import SkillModalBtn from "../Modal/SkillModal";
import { NameInput, ReferenceInput } from "../Inputs/Input"
import { DescriptionInput, DownloadLibraryInput } from "../Inputs/Textarea"
import ReferenceList from "../List/ReferenceList";

export const CreateImageSection = ({
    title,
    description,
    imageUploading,
    image,
    handleImage,
    creating
}) => {
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>{title}</h4>
            <span className="text-muted">{description}</span>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: 'center',
                justifyContent: "center"
            }}
            >
                <div className="mt-5">
                    {imageUploading ? (<></>) : (
                        image && <img 
                            src={image} 
                            alt="_thumbnail" 
                            style={{ height: "400px" }}
                            width={"285px"}
                            className="image-fluid rounded-3 shadow-lg"
                            />
                    )}
                </div>
                <div>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImage}
                        disabled={creating}
                    />
                </div>
            </div>
        </div>
    )
}

export const CreateNameSection = ({
    title,
    description,
    name,
    onChangeName,
    creating
}) => {
    return(
        <div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
                <h4>{title}</h4>
                <span className="text-muted">{description}</span>
            </div>
            <NameInput 
                name={name}
                onChangeName={onChangeName}
                disabled={creating}
            />
    </div>
    )
}


export const CreateReferences = ({
    title,
    description,
    addingReference,
    references,
    creating,
    setAddingReference
}) => {
    return(
        <div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
                <h4>{title}</h4>
                <span className="text-muted">{description}</span>
            </div>
            <div>
                <ReferenceList
                    addingReference={addingReference}
                    references={references}
                />
            </div>
            <div className="mt-2">
                <ReferenceInput 
                    creating={creating}
                    references={references}
                    setAddingReference={setAddingReference}
                />
            </div>
        </div>
    )
}

export const CreateDownloadLibrary = ({
    creating,
    downloadLibrary,
    onChangeDownloadLibrary
}) => {
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>* 라이브러리 다운로드 명령어</h4>
            <span className="text-muted">라이브러리 다운로드를 위한 명령어를 입력하세요</span>
            <div>
                <DownloadLibraryInput 
                    creating={creating}
                    downloadLibrary={downloadLibrary}
                    onChangeDownloadLibrary={onChangeDownloadLibrary}
                />
            </div>
        </div>
    )
}

export const CreateHelloWorld = ({
    creating,
    title,
    helloworld,
    onChangeHelloworld
}) => {
    return(
        <div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
                <h4>{title}</h4>
                <span className="text-muted">언어인 경우, Hello World를 출력하는 코드를 작성하세요</span>
            </div>
            <div>
                <textarea
                    className="form-control"
                    name="helloworld"
                    value={helloworld}
                    onChange={onChangeHelloworld}
                    placeholder=""
                    disabled={creating}
                >
                </textarea>
            </div>
        </div>
    )
}

export const CreateSkillTree = ({
    title,
    description,
    loadedSkills,
    addingSkill,
    onAddSkill,
    skills,
    deletingSkill,
    setDeletingSkill
}) => {
    return(
        <div className="text-uppercase-expanded small mb-2 pt-5">
            <h4>{title}</h4>
            <span className="text-muted">{description}</span>
            <div className="mt-3">
                <SkillModalBtn 
                    loadedSkills={loadedSkills}
                    addingSkill={addingSkill}
                    onAddSkill={onAddSkill}
                />
            </div>
            <div className="mt-3">
                <SkillList
                    skills={skills}
                    deletingSkill={deletingSkill}
                    setDeletingSkill={setDeletingSkill}
                />
            </div>
        </div>
    )
}

export const CreateRepresentationInputs = ({
    computerLanguage,
    framework,
    onChangeComputerLanguage,
    onChangeFramework
}) => {
    return(
        <div className="row">
            <div className="col-md-6">
                <div className="text-uppercase-expanded small mb-2 pt-5">
                    <h4>* 대표 언어</h4>
                    <span className="text-muted">해당 개발 분야를 대표하는 언어</span>
                </div>
                <input 
                    type="text"
                    name="computerLanguage"
                    value={computerLanguage}
                    onChange={onChangeComputerLanguage}
                    className="form-control"
                />
            </div>
            <div className="col-md-6">
                <div className="text-uppercase-expanded small mb-2 pt-5">
                    <h4>* 대표 프레임워크</h4>
                    <span className="text-muted">해당 개발 분야를 대표하는 프레임워크</span>
                </div>
                <input 
                    type="text"
                    name="framework"
                    value={framework}
                    onChange={onChangeFramework}
                    className="form-control"
                />
            </div>
        </div>
    )
}