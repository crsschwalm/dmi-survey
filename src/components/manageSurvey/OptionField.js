import React, { Fragment } from "react";
import { connect } from "react-redux";
import EditableCheckBox from "../form/EditableCheckBox";
import Input from "../form/Input";
import {
  addOption,
  removeOption,
  setExpectedOptions
} from "../../actions/manageFieldActions";

const OptionField = props => (
  <Fragment>
    <Input
      label="Answer"
      placeholder="e.g. Choose this option"
      help="Add answer with &quot;Enter&quot;"
      onSubmit={props.addOption}
    />
    <AvailableOptions {...props} />
  </Fragment>
);

const AvailableOptions = ({
  removeOption,
  setExpectedOptions,
  expectedResponse,
  options
}) =>
  !!options.length && (
    <Fragment>
      <p>
        <strong>Select the expected response</strong>
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "wrap"
        }}
      >
        {options.map((option, index) => (
          <div key={index} style={{ padding: "0 1rem" }}>
            <EditableCheckBox
              title={option}
              value={expectedResponse.indexOf(option) !== -1}
              type="EditableCheckBox"
              onChange={setExpectedOptions}
              onDelete={() => removeOption(option)}
            />
          </div>
        ))}
      </div>
    </Fragment>
  );

const mapDispatchToProps = (dispatch, ownProps) => ({
  addOption: value => {
    dispatch(addOption(ownProps.fieldIndex, value));
  },
  removeOption: value => dispatch(removeOption(ownProps.fieldIndex, value)),
  setExpectedOptions: ({ target: { title } }) =>
    dispatch(setExpectedOptions(ownProps.fieldIndex, title))
});

const mapStateToProps = (state, ownProps) => ({
  ...state.manageSurvey.fields[ownProps.fieldIndex]
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionField);
