import { useState } from "react";
import {
  FieldLists,
  FrontendFieldLists,
  BackendFieldLists,
  SecurityFieldLists,
} from "../Constants/Lists";

export const FieldSelectTag = ({
  totalFieldsNumber,
  setAddingField,
  setTotalFieldsNumber,
  fields,
}) => {
  const [field, setField] = useState(FieldLists[0]);
  const [detailField, setDetailField] = useState(FrontendFieldLists[0]);

  const onChangeField = (e) => {
    setField(e.target.value);
  };

  const onChangeDetailField = (e) => {
    setDetailField(e.target.value);
  };

  const onAddField = async (e) => {
    e.preventDefault();
    await setAddingField(true);
    fields.push({
      field,
      detailField,
    });
    await setTotalFieldsNumber(totalFieldsNumber + 1);
    await setAddingField(false);
  };

  return (
    <div className="row">
      <div className="col-3">
        <FieldSelect
          onChangeField={onChangeField}
          totalFieldsNumber={totalFieldsNumber}
        />
      </div>
      <div className="col-5">
        <DetailFieldSelect
          field={field}
          onChangeDetailField={onChangeDetailField}
          totalFieldsNumber={totalFieldsNumber}
        />
      </div>
      <div className="col-2">
        <DetailNumSelect />
      </div>
      <div className="col">
        <button
          className="btn btn-primary"
          onClick={onAddField}
          disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}
        >
          <i className="fa-sharp fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

const FieldSelect = ({ onChangeField, totalFieldsNumber }) => {
  return (
    <select
      className="form-select"
      onChange={onChangeField}
      disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}
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

const DetailNumSelect = () => {
  return (
    <select className="form-select">
      <option selected>1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
    </select>
  );
};

const DetailFieldSelect = ({
  field,
  onChangeDetailField,
  totalFieldsNumber,
}) => {
  if (field === FieldLists[0]) {
    return (
      <select
        className="form-select"
        onChange={onChangeDetailField}
        disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}
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
        disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}
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
        disabled={totalFieldsNumber > 4 || totalFieldsNumber < 0}
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
