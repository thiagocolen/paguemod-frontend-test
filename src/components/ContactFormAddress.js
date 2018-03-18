import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

import * as contactActions from '../actions'


class ContactFormAddress extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.state = {
      streetName: 'String',
      streetNumber: 1,
      neighborhood: 'String',
      complement: 'String',
      zip: '12345678',
      city: 'String',
      state: 'SP',
      country: 'String' 
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
            <h1>ContactFormAddress</h1>
          </div>
        </div>


        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Street Name"
              value={this.state.streetName}
              onChange={this.handleChange.bind(this, 'streetName')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Street Number"
              value={this.state.streetNumber}
              onChange={this.handleChange.bind(this, 'streetNumber')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Neighborhood"
              value={this.state.neighborhood}
              onChange={this.handleChange.bind(this, 'neighborhood')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Complement"
              value={this.state.complement}
              onChange={this.handleChange.bind(this, 'complement')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Zip"
              value={this.state.zip}
              onChange={this.handleChange.bind(this, 'zip')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="City"
              value={this.state.city}
              onChange={this.handleChange.bind(this, 'city')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="State"
              value={this.state.state}
              onChange={this.handleChange.bind(this, 'state')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Country"
              value={this.state.country}
              onChange={this.handleChange.bind(this, 'country')} />
          </div>
        </div>

        <div className="row">
        <div className="col-xs-6">
            <Link to="/new-contact-step-1">
              <RaisedButton 
                label="Previous Step" 
                primary={true} />           
            </Link>
          </div>
          <div className="col-xs-6">
            <Link to="/contacts">
              <RaisedButton 
                label="Save Contact" 
                primary={true} />           
            </Link>
          </div>
        </div>

      </div>
    )
  }
}

ContactFormAddress.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormAddress)