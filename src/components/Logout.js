import React from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";

const Logout = ({ children, logout }) => (
  <span onClick={logout}>{children}</span>
);

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(() => ({}), mapDispatchToProps)(Logout);
