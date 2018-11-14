import React from "react";

const SurveyCard = ({ survey, renderOptions }) => (
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
          <div className="level-left">{renderOptions(survey)}</div>
        </nav>
      </div>
    </article>
  </div>
);

export default SurveyCard;
