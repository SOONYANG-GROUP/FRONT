import { useState } from "react";
import {
  FieldLists,
  FrontendFieldLists,
  BackendFieldLists,
  SecurityFieldLists,
} from "../Constants/Lists";

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
