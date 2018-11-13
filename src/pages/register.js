import React, { Component } from "react";
import { connect } from "react-redux";
import { register } from "../actions/authActions";
import { Container, Field, ButtonGroup } from "../components/login";
import { Lock, User, Check } from "../components/login/Icons";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConf: ""
  };
  onEmailChange = ({ target: { value } }) => this.setState({ email: value });
  onUsernameChange = ({ target: { value } }) =>
    this.setState({ username: value });
  onPasswordChange = ({ target: { value } }) =>
    this.setState({ password: value });
  onConfirmPasswordChange = ({ target: { value } }) =>
    this.setState({ passwordConf: value });

  validPasswords = () =>
    this.state.password === this.state.passwordConf && !!this.state.password;

  canSubmit = () => {
    const notEmpty =
      !!this.state.email &&
      !!this.state.username &&
      !!this.state.password &&
      !!this.state.passwordConf;
    return notEmpty && this.validPasswords();
  };

  handleSubmit = async e => {
    e.preventDefault();
    if (this.canSubmit()) {
      try {
        await this.props.register(this.state);
        goHome();
      } catch (error) {
        this.setState({ error: error });
      }
    }
  };

  render() {
    const { error } = this.state;
    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          {!!error && <span>{error}</span>}
          <Field>
            <input
              className="input"
              type="text"
              placeholder="Email"
              onChange={this.onEmailChange}
              value={this.state.email}
            />
            <User />
            {this.state.email && <Check />}
          </Field>
          <Field>
            <input
              className="input"
              type="text"
              placeholder="UserName"
              onChange={this.onUsernameChange}
              value={this.state.username}
            />
            <User />
            {this.state.username && <Check />}
          </Field>
          <Field>
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={this.onPasswordChange}
              value={this.state.password}
            />
            <Lock />
            {this.validPasswords() && <Check />}
          </Field>
          <Field>
            <input
              className="input"
              type="password"
              placeholder="Password"
              onChange={this.onConfirmPasswordChange}
              value={this.state.passwordConf}
            />
            <Lock />
            {this.validPasswords() && <Check />}
          </Field>
          <ButtonGroup>
            <div className="control">
              <input
                type="submit"
                className="button is-success"
                disabled={!this.canSubmit()}
                value="Register"
              />
            </div>
            <div className="control">
              <button
                className="button is-text"
                onClick={() => window.location.replace("/login")}
              >
                Existing User?
              </button>
            </div>
          </ButtonGroup>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  register: userInfo => dispatch(register(userInfo))
});

const goHome = () => window.location.replace("/");

export default connect(mapStateToProps, mapDispatchToProps)(Register);
