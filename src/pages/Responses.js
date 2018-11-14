import React, { Component } from "react";
import HeadLine from "../components/form/HeadLine";
import { connect } from "react-redux";
import { fetchResponses } from "../actions/responseActions";

class Responses extends Component {
  componentDidMount() {
    const { match: { params } } = this.props;
    !!params.surveyId ? this.props.fetchResponses(params.surveyId) : goHome();
  }

  //   componentWillUnmount() {
  //     goHome()
  //   }

  render() {
    const { responses, match: { params } } = this.props;
    return (
      <section className="container section">
        <HeadLine
          heading="Survey Response"
          subheading={`Survey: ${params.surveyId || "emptyID"}`}
        />
        {responses &&
          responses.map((surveyResponse, index) => (
            <div key={`survey-response-${index}`}>
              <span>{index + 1}</span>
              {surveyResponse.fieldResponses.map((fieldResponse, index) => (
                <div key={`field-response-${index}`}>
                  <strong>{fieldResponse.fieldRef}: </strong>
                  <span>{JSON.stringify(fieldResponse.response)}</span>
                </div>
              ))}
            </div>
          ))}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  responses: state.responses.surveyResponses
});

const mapDispatchToProps = dispatch => ({
  fetchResponses: id => dispatch(fetchResponses(id))
});

const goHome = () => window.location.replace("/");

export default connect(mapStateToProps, mapDispatchToProps)(Responses);
