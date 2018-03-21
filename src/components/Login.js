import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

import * as contactActions from '../actions'


class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    redirectToReferrer: false   
  }

  login = () => {
    this.props.fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h1>Login</h1>
        <button onClick={this.login}>login</button>
      </div>
    ) 
  }
}

export default Login