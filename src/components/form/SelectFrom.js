import React from "react";

const SelectFrom = ({ label, onChange, options }) => (
  <div className="field is-horizontal">
    <div className="field-label is-normal">
      <label className="label">{label}</label>
    </div>
    <div className="field-body">
      <div className="field">
        <div className="control">
          <div className="select">
            <select
              onChange={e => onChange(e.target.value)}
              defaultValue="default"
            >
              <option disabled="disabled" value="default">
                Choose an option
              </option>
              <DropDownOptions options={options} />
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DropDownOptions = ({ options }) =>
  options.map((value, index) => (
    <option key={index} value={value}>
      {value}
    </option>
  ));

export default SelectFrom;
