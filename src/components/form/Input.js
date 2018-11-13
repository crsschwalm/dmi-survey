import React, { Component } from "react";

class Input extends Component {
  state = {
    value: this.props.value
  };

  handleChange = value => {
    this.setState({ value: value });
    !!this.props.onChange && this.props.onChange(value);
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!!this.props.onSubmit && !!this.state.value) {
      this.props.onSubmit(this.state.value);
      this.setState({ value: "" });
    }
  };

  render() {
    const { label, placeholder, help } = this.props;
    return (
      <form className="field is-horizontal" onSubmit={this.handleSubmit}>
        <div className="field-label is-normal">
          <label className="label">{label}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                value={this.state.value}
                onChange={e => this.handleChange(e.target.value)}
                className="input"
                type="text"
                placeholder={placeholder}
              />
            </div>
            {!!help ? <p className="help">{help}</p> : null}
          </div>
        </div>
      </form>
    );
  }
}

export default Input;
