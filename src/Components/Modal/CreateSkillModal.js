import React, { useState } from "react";

const CreateSkillBtn = () => {
    return(
        <>
            <button type="button" className="btn btn-lg btn-primary-soft text-primary fw-500" data-bs-toggle="modal" data-bs-target="#exampleModal3">
                스킬 추가하기
            </button>
            <CreateSkillModal />
        </>
    )
}

const CreateSkillModal = () => {
    const [ creating, setCreating ] = useState(false);
    const [ addingReference, setAddingReference ] = useState(false);

    const [ name, setName ] = useState("");
    // Studies
    const [ studyTip, setStudyTip ] = useState("");


    return(
        <div className="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">스킬 추가</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        dafasdf
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSkillBtn;