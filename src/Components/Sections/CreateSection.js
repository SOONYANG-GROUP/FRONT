import React from "react";
import SkillList from "../List/SkillList";
import SkillModalBtn from "../Modal/SkillModal";
import { NameInput, ReferenceInput } from "../Inputs/Input"
import { DescriptionInput, StudyTip} from "../Inputs/Textarea"
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
            <div>
                {imageUploading ? (<></>) : (
                    image && <img src={image} alt="_thumbnail" />
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

export const CreateStudyTip = ({
    title,
    description,
    studyTip,
    creating,
    onChangeStudyTip
}) => {
    return(
        <div>
            <div className="text-uppercase-expanded small mb-2 pt-5">
                <h4>{title}</h4>
                <span className="text-muted">{description}</span>
            </div>
            <StudyTip
                studyTip={studyTip}
                disabled={creating}
                onChangeStudyTip={onChangeStudyTip}
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
            <div>
                <SkillModalBtn 
                    loadedSkills={loadedSkills}
                    addingSkill={addingSkill}
                    onAddSkill={onAddSkill}
                />
            </div>
            <div>
                <SkillList
                    skills={skills}
                    deletingSkill={deletingSkill}
                    setDeletingSkill={setDeletingSkill}
                />
            </div>
        </div>
    )
}