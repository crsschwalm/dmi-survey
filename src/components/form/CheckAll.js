import React, { Component } from "react";
import InputCheckBox from "./InputCheckbox";

export default class CheckAll extends Component {
  state = {
    checked: []
  };

  handleCheck = event => {
    const { checked } = this.state;
    const { title } = event.target;

    const updatedChecked =
      checked.indexOf(title) === -1
        ? [...checked, title]
        : checked.filter(option => option !== title);

    this.setState({ checked: updatedChecked });
    this.props.onChange(updatedChecked);
  };

  render() {
    return (
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">{this.props.label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <CheckBoxes
                options={this.props.options}
                onChange={this.handleCheck}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const CheckBoxes = ({ options, onChange }) =>
  options.map((value, index) => (
    <InputCheckBox
      index={index}
      key={index}
      label={value}
      value={false}
      onChange={onChange}
    />
  ));
