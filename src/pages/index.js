import React from "react";
import "./index.css";
import SurveyCard from "../components/SurveyCard";
import AsyncList from "../components/AsyncList";
import Loading from "../components/Loading";
import HeadLine from "../components/form/HeadLine";
import ReactSpinny from "../components/ReactSpinny";
import { connect } from "react-redux";

const Home = ({ user }) => (
  <div className="App">
    <ReactSpinny />
    <div className="container section">
      <HeadLine
        heading="Check out a new Survey!"
        subheading={`Welcome ${user.name || user.username}`}
      />
      <AsyncList
        url={`${process.env.REACT_APP_API_URL}/api/survey`}
        render={({ list, isLoading }) =>
          isLoading ? (
            <Loading />
          ) : (
            list.map((survey, index) => (
              <SurveyCard key={index} survey={survey} />
            ))
          )}
      />
    </div>
  </div>
);

const mapStateToProps = state => ({ user: state.auth });

export default connect(mapStateToProps)(Home);
