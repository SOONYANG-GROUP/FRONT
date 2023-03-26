import React, { useState } from "react";

const FieldListElement = ({ index, field, onDeleteField }) => {
  return (
    <div key={index} className="row mb-2">
      <div className="col-3">
        <select className="form-select" disabled>
          <option>{field.field}</option>
        </select>
      </div>
      <div className="col-5">
        <select className="form-select" disabled>
          <option>{field.detailField}</option>
        </select>
      </div>
      <div className="col-2">
        <select className="form-select" disabled>
          <option>{field.maxRecruit}</option>
        </select>
      </div>
      <div className="col" id={index}>
        <button className="btn btn-danger" id={index} onClick={onDeleteField}>
          <span id={index}>
            <i className="fa-solid fa-trash" id={index}></i>
          </span>
        </button>
      </div>
    </div>
  );
};

const FieldList = ({ fields, theNumberOfRemain, setTheNumberOfRemain }) => {
  const [deleting, setDeleting] = useState(false);

  //const onDeleteField = async (e) => {
  //  e.preventDefault();
  //  await setDeleting(true);
  //  fields.splice(parseInt(e.target.id), 1);
  //  setTotalFieldsNumber(totalFieldsNumber - 1);
  //  await setDeleting(false);
  //};

  const onDeleteField = async (e) => {
    e.preventDefault();
    await setDeleting(true);

    const indexOfFields = parseInt(e.target.id);
    const delMaxRecruit = fields[parseInt(e.target.id)].maxRecruit;

    setTheNumberOfRemain(theNumberOfRemain + parseInt(delMaxRecruit));
    fields.splice(parseInt(indexOfFields), 1);

    await setDeleting(false);
  };

  if (fields.length === 0) {
    return <></>;
  } else {
    if (deleting) {
      return <div>deleting</div>;
    } else {
      return fields.map((fieldEle, index) => {
        return (
          <FieldListElement
            field={fieldEle}
            key={index}
            index={index}
            onDeleteField={onDeleteField}
          />
        );
      });
    }
  }
};

export default FieldList;
