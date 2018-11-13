import React, { Fragment } from "react";
import { connect } from "react-redux";
import Field from "./Field";
import { addField, removeField } from "../../actions/manageFieldActions";
import NewFieldButtons from "../form/NewFieldButtons";

const FieldList = ({ fields, addField, removeField }) => (
  <Fragment>
    {fields.map((field, index) => (
      <Field
        {...field}
        key={index}
        index={index}
        removeField={() => removeField(index)}
      />
    ))}
    <NewFieldButtons addField={addField} />
  </Fragment>
);

const mapStateToProps = state => ({ fields: state.manageSurvey.fields });

const mapDispatchToProps = dispatch => ({
  addField: fieldType => dispatch(addField(fieldType)),
  removeField: fieldIndex => dispatch(removeField(fieldIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(FieldList);
