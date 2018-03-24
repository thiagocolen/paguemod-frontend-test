import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'

import * as contactActions from '../actions'


class ContactFormAddress extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false,
      address: {
        streetName: '',
        streetNumber: '',
        neighborhood: '',
        complement: '',
        zip: '',
        city: '',
        state: '',
        country: '' 
      }
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    if (
      this.props.match.path === '/edit-contact-step-2/:id' &&
      this.props.newContact.id !== undefined
    ) {
      this.setState({ address: this.props.newContact.address })
    }
  }  

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)

    if (nextProps.newContactAddedMessage === 'ADDRESS_ADDED') {

      if (this.props.match.path === '/edit-contact-step-2/:id') {
        this.props.actions.editContact(nextProps.newContact, nextProps.newContact.id, this.props.auth)
        return
      }
  
      this.props.actions.addContact(nextProps.newContact, this.props.auth)
      return
    }

    if (nextProps.newContactAddedMessage === 'FULFILLED') {
      this.setState({ snackbarOpen: true })
      return
    }
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false })
    this.props.actions.clearNewContactAddedMessage()
    setTimeout(() => {
      this.props.history.push('/contacts')                
    }, 800)
  }

  handleChange = (prop, event, newValue) => {
    this.setState({ 
      address: { 
        ...this.state.address,
        [prop]: newValue 
      } 
    })
  }

  handlePreviousStep = () => {
    if (this.props.match.path === '/edit-contact-step-2/:id') {
      this.props.actions.newContactAddress(this.state.address)      
      this.props.history.push('/edit-contact-step-1/' + this.props.match.params.id)

      return    
    }
    this.props.history.push('/new-contact-step-1')
  }

  handleSaveContact = () => {
    if (this.formValidation()) {
      this.props.actions.newContactAddress(this.state.address)
    }
  }

  formValidation = () => {
    if (this.state.address.streetName === '') { return false }
    if (this.state.address.streetNumber === '') { return false }
    if (this.state.address.neighborhood === '') { return false }
    if (this.state.address.zip.length < 8) { return false }
    if (this.state.address.city === '') { return false }
    if (this.state.address.state.length !== 2) { return false }
    if (this.state.address.country === '') { return false }
    return true
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
              value={this.state.address.streetName}
              onChange={this.handleChange.bind(this, 'streetName')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Street Number"
              value={this.state.address.streetNumber}
              onChange={this.handleChange.bind(this, 'streetNumber')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Neighborhood"
              value={this.state.address.neighborhood}
              onChange={this.handleChange.bind(this, 'neighborhood')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Complement"
              value={this.state.address.complement}
              onChange={this.handleChange.bind(this, 'complement')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Zip"
              value={this.state.address.zip}
              onChange={this.handleChange.bind(this, 'zip')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="City"
              value={this.state.address.city}
              onChange={this.handleChange.bind(this, 'city')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="State"
              value={this.state.address.state}
              onChange={this.handleChange.bind(this, 'state')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Country"
              value={this.state.address.country}
              onChange={this.handleChange.bind(this, 'country')} />
          </div>
        </div>

        <div className="row">
        <div className="col-xs-6">
            <RaisedButton 
              label="Previous Step" 
              primary={true}           
              onClick={this.handlePreviousStep} />           
          </div>
          <div className="col-xs-6">
            <RaisedButton 
              label="Save Contact" 
              primary={true} 
              onClick={this.handleSaveContact} />           
          </div>
        </div>

        <Snackbar
          open={this.state.snackbarOpen}
          message="SUCCESS"
          autoHideDuration={3000}
          onRequestClose={this.handleSnackbarClose} />

      </div>
    )
  }
}

ContactFormAddress.propTypes = {
  auth: PropTypes.object,
  newContact: PropTypes.object.isRequired,
  newContactAddedMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  contactList: state.contactsReducer.contactList,  
  newContact: state.contactsReducer.newContact,
  newContactAddedMessage: state.contactsReducer.newContactAddedMessage
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormAddress)