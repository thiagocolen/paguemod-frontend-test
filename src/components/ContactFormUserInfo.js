import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

import * as contactActions from '../actions'


class ContactFormUserInfo extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.state = {
      name: 'NewString',
      cpf: '12345678901',
      cnpj: '12345678901234',
      gender: 'm',
      website: 'String',
      email: 'String',
      telephone: 'String' 
    }
  }


  componentDidMount() {
    console.log('componentDidMount')
  }  

  handleChange = (prop, event, newValue) => {
    this.setState({ [prop]: newValue })
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12">
            <h1>ContactFormUserInfo</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Name"
              value={this.state.name}
              onChange={this.handleChange.bind(this, 'name')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="CPF"
              value={this.state.cpf}
              onChange={this.handleChange.bind(this, 'cpf')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="CNPJ"
              value={this.state.cnpj}
              onChange={this.handleChange.bind(this, 'cnpj')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Gender"
              value={this.state.gender}
              onChange={this.handleChange.bind(this, 'gender')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Website"
              value={this.state.website}
              onChange={this.handleChange.bind(this, 'website')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="e-mail"
              value={this.state.email}
              onChange={this.handleChange.bind(this, 'email')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Telephone"
              value={this.state.telephone}
              onChange={this.handleChange.bind(this, 'telephone')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <Link to="/new-contact-step-2">
              <RaisedButton 
                label="Next Step" 
                primary={true} />           
            </Link>
          </div>
        </div>


      </div>
    ) 
  }

}

ContactFormUserInfo.propTypes = {
  // contactList: PropTypes.array
}

const mapStateToProps = (state) => ({
  // contactList: state.contactsReducer.contactList
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormUserInfo)