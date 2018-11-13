import { Component } from "react";
import { connect } from "react-redux";
import { get } from "axios";

class AsyncList extends Component {
  state = {
    list: [],
    isLoading: false
  };

  getData = () => {
    this.setState({ isLoading: true });
    this.callApi()
      .then(res => this.setState({ list: res, isLoading: false }))
      .catch(err => console.log(err));
  };

  callApi = () =>
    get(this.props.url, { auth: this.props.auth }).then(response => {
      if (response.status !== 200)
        throw Error(response.message || response.statusText);
      return response.data;
    });

  componentDidMount() {
    this.getData();
  }

  render() {
    return this.props.render(this.state);
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(AsyncList);
