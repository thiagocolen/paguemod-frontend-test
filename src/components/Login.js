import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Redirect } from 'react-router-dom'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

import * as actions from '../actions'


class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    redirectToReferrer: false,
    username: '',
    password: ''
  }

  login = () => {
    this.props.actions.setUserData(
      this.state.username,
      this.state.password
    )
    this.props.fakeAuth.authenticate(
      () => { this.setState({ redirectToReferrer: true }); }, 
      this.state.username,
      this.state.password
    )
  }

  handleChange = (prop, event, newValue) => {    
    this.setState({ [prop]: newValue })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (      
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3 text-center">
            <Card>
              <CardText>
                <h1>Welcome</h1>
                <TextField 
                  floatingLabelText="Username"
                  value={this.state.username}
                  onChange={this.handleChange.bind(this, 'username')} />
                <br/>
                <TextField 
                  type="password"
                  floatingLabelText="Password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this, 'password')} />
                <br/>
                <RaisedButton 
                  label="Login" 
                  primary={true}
                  onClick={this.login}
                  style={{marginTop: '30px'}} />  
              </CardText>                
            </Card>
          </div>
        </div>
      </div>
    ) 
  }
}

Login.propTypes = {
  username: PropTypes.string
}

const mapStateToProps = (state) => ({
  username: state.authReducer.auth.username
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...actions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
