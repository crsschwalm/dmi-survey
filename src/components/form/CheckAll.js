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
      <div className="field ">
        <label className="label">{this.props.label}</label>
        <div className="control is-grouped is-grouped-multiline">
          <CheckBoxes
            options={this.props.options}
            onChange={this.handleCheck}
          />
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
