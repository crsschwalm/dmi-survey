import React from "react";

const SurveyCard = ({ survey }) => (
  <div className="box">
    <article className="media">
      <div className="media-left">
        <span className="icon is-large">
          <i
            className={`fas fa-2x ${survey.iconClass || "fa-bug"}`}
            aria-hidden="true"
          />
        </span>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{survey.name}</strong> <small>{survey.Ref}</small> <br />
            {survey.description}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a
              href={`/survey/take/${survey._id}`}
              className="button is-link is-medium level-item"
            >
              Take Survey
            </a>
          </div>
          <div className="level-right">
            <a
              href={`/survey/manage/${survey._id}`}
              className="button is-warning is-medium level-item"
            >
              Manage Survey
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
);

export default SurveyCard;
