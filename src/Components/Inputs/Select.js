import { useState } from "react";
import {
  FieldLists,
  FrontendFieldLists,
  BackendFieldLists,
  SecurityFieldLists,
} from "../Constants/Lists";

export const SkillCategorySelectTag = ({
  category,
  onClickSkillCategory
}) => {
  console.log(category)
  return(
    <div className="text-uppercase-expanded small mb-2 pt-5">
      <h4>* 스킬 카테고리</h4>
      <span className="text-muted">어떤 스킬인가요?</span>
      <div>
        <div className="form-check">
          {category === "컴퓨터 언어" ? (<>
            <input 
            className="form-check-input" 
            type="radio" 
            name="flexRadioDefault" 
            id="computerLanguage" 
            onClick={onClickSkillCategory}
            defaultChecked
          />
          <label className="form-check-label" htmlFor="computerLanguage">
            컴퓨터 언어
          </label>
          </>) : (<>            
          <input 
            className="form-check-input" 
            type="radio" 
            name="flexRadioDefault" 
            id="computerLanguage" 
            onClick={onClickSkillCategory}
          />
          <label className="form-check-label" htmlFor="computerLanguage">
            컴퓨터 언어
          </label>
        </>)}
        </div>
        <div className="form-check">
          {category === "라이브러리" ? (<>
            <input 
            className="form-check-input" 
            type="radio" 
            name="flexRadioDefault" 
            id="library" 
            onClick={onClickSkillCategory}  
            defaultChecked
          />
          <label className="form-check-label" htmlFor="library">
            라이브러리
          </label>
          </>) : (<>
            <input 
            className="form-check-input" 
            type="radio" 
            name="flexRadioDefault" 
            id="library" 
            onClick={onClickSkillCategory}  
          />
          <label className="form-check-label" htmlFor="library">
            라이브러리
          </label>
          </>)}
        </div>
      </div>
    </div>
  )
}


export const CreateRoadmapFieldSelectTag = ({
  selectedField,
  creating,
  onChangeSelectedField,
  editMode = false,
}) => {
  return(
    <div className="text-uppercase-expanded small mb-2 pt-5">
      <h4>로드맵 필드 설정</h4>
      <span className="text-muted">로드맵과 어울리는 필드 값을 설정해 주세요</span>
      <select
        className="form-select"
        disabled={creating}
        onClick={onChangeSelectedField}
      >
        {FieldLists.map((fieldEle, index) => {
          return(
            <option
              value={fieldEle}
              key={index}
              selected={(fieldEle === selectedField) && editMode}
            >
              {fieldEle}
            </option>
          )
        })}
      </select>
    </div>
  )
}


export const FieldSelectTag = ({
  theNumberOfRemain,
  setAddingField,
  fields,
  setTheNumberOfRemain,
}) => {
  const [field, setField] = useState(FieldLists[0]);
  const [detailField, setDetailField] = useState(FrontendFieldLists[0]);
  const [maxRecruit, setMaxRecruit] = useState(1);

  const onChangeField = (e) => {
    setField(e.target.value);
  };

  const onChangeDetailField = (e) => {
    setDetailField(e.target.value);
  };

  const onChangemaxRecruit = (e) => {
    setMaxRecruit(parseInt(e.target.value));
  };

  const onAddField = async (e) => {
    e.preventDefault();
    await setAddingField(true);

    if (theNumberOfRemain - maxRecruit >= 0) {
      fields.push({
        field,
        detailField,
        maxRecruit,
      });
      setMaxRecruit(1);
      await setTheNumberOfRemain(theNumberOfRemain - maxRecruit);
    }
    await setAddingField(false);
  };

  return (
    <div className="row">
      <div className="col-3">
        <FieldSelect
          onChangeField={onChangeField}
          theNumberOfRemain={theNumberOfRemain}
        />
      </div>
      <div className="col-5">
        <DetailFieldSelect
          field={field}
          onChangeDetailField={onChangeDetailField}
          theNumberOfRemain={theNumberOfRemain}
        />
      </div>
      <div className="col-2">
        <DetailNumSelect
          theNumberOfRemain={theNumberOfRemain}
          onChangemaxRecruit={onChangemaxRecruit}
          maxRecruit={maxRecruit}
        />
      </div>

      <div className="col">
        <button
          className="btn btn-primary"
          onClick={onAddField}
          disabled={theNumberOfRemain <= 0}
        >
          <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

const FieldSelect = ({ onChangeField, theNumberOfRemain }) => {
  return (
    <select
      className="form-select"
      onChange={onChangeField}
      disabled={theNumberOfRemain === 0}
    >
      {FieldLists.map((FieldListEle, index) => {
        return (
          <option value={FieldListEle} key={index}>
            {FieldListEle}
          </option>
        );
      })}
    </select>
  );
};

const DetailNumSelect = ({
  maxRecruit,
  theNumberOfRemain,
  onChangemaxRecruit,
}) => {
  return (
    <select
      className="form-select"
      disabled={theNumberOfRemain <= 0}
      onClick={onChangemaxRecruit}
    >
      {theNumberOfRemain > 0 ? (
        <option id="1" selected={maxRecruit === 1 ? true : false}>
          1
        </option>
      ) : (
        <></>
      )}
      {theNumberOfRemain > 1 ? (
        <option id="2" selected={maxRecruit === 2 ? true : false}>
          2
        </option>
      ) : (
        <></>
      )}
      {theNumberOfRemain > 2 ? (
        <option id="3" selected={maxRecruit === 3 ? true : false}>
          3
        </option>
      ) : (
        <></>
      )}
      {theNumberOfRemain > 3 ? (
        <option id="4" selected={maxRecruit === 4 ? true : false}>
          4
        </option>
      ) : (
        <></>
      )}
      {theNumberOfRemain > 4 ? (
        <option id="5" selected={maxRecruit === 5 ? true : false}>
          5
        </option>
      ) : (
        <></>
      )}
    </select>
  );
};

const DetailFieldSelect = ({
  field,
  onChangeDetailField,
  theNumberOfRemain,
}) => {
  if (field === FieldLists[0]) {
    return (
      <select
        className="form-select"
        onChange={onChangeDetailField}
        disabled={theNumberOfRemain <= 0}
      >
        {FrontendFieldLists.map((FrontendFieldEle, index) => {
          return (
            <option value={FrontendFieldEle} key={index}>
              {FrontendFieldEle}
            </option>
          );
        })}
      </select>
    );
  } else if (field === FieldLists[1]) {
    return (
      <select
        className="form-select"
        onChange={onChangeDetailField}
        disabled={theNumberOfRemain <= 0}
      >
        {BackendFieldLists.map((BackendFieldEle, index) => {
          return (
            <option value={BackendFieldEle} key={index}>
              {BackendFieldEle}
            </option>
          );
        })}
      </select>
    );
  } else if (field === FieldLists[2]) {
    return (
      <select
        className="form-select"
        onChange={onChangeDetailField}
        disabled={theNumberOfRemain <= 0}
      >
        {SecurityFieldLists.map((securityEle, index) => {
          return (
            <option value={securityEle} key={index}>
              {securityEle}
            </option>
          );
        })}
      </select>
    );
  }
};
