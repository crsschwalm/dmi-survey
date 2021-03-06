import React, { Fragment } from "react";
import Input from "../form/Input";
import TextArea from "../form/TextArea";
import ReadOnly from "../form/ReadOnly";
import { connect } from "react-redux";
import { setName, setDescription } from "../../actions/manageSurveyActions";

const About = ({
  user,
  setName,
  setDescription,
  manageSurvey: { name, description, authorRef }
}) => (
  <Fragment>
    <ReadOnly label="Author" value={authorRef || user.username} />
    <Input
      label="Survey Name"
      value={name}
      placeholder="What would you say..."
      onChange={setName}
    />
    <TextArea
      label="Description"
      value={description}
      onChange={setDescription}
      placeholder="e.g. We want to know more about you!"
    />
  </Fragment>
);

const mapStateToProps = state => ({
  manageSurvey: state.manageSurvey,
  user: state.auth
});

const mapDispatchToProps = dispatch => ({
  setName: value => dispatch(setName(value)),
  setDescription: value => dispatch(setDescription(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
