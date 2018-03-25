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
      errorMessages: {
        streetName: '',
        streetNumber: '',
        neighborhood: '',
        complement: '',
        zip: '',
        city: '',
        state: '',
        country: '' 
      },
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
    if (
      this.props.match.path === '/edit-contact-step-2/:id' &&
      this.props.newContact.id !== undefined
    ) {
      this.setState({ address: this.props.newContact.address })
    }
  }  

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)

    if (nextProps.newContact.address.zip !== '') {
      this.setState({
        address: {
          zip: nextProps.newContact.address.zip,
          streetName: nextProps.newContact.address.streetName,
          neighborhood: nextProps.newContact.address.neighborhood,
          city: nextProps.newContact.address.city,
          state: nextProps.newContact.address.state,
          country: nextProps.newContact.address.country 
        }
      })
    }

    if (nextProps.newContactAddedMessage === 'ADDRESS_ADDED') {
      if (this.props.match.path === '/edit-contact-step-2/:id') {
        this.props.actions.editContact(
          nextProps.newContact, 
          nextProps.newContact.id, 
          this.props.auth
        )
        return
      }
  
      this.props.actions.addContact(
        nextProps.newContact, 
        this.props.auth
      )
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
    let requiredFieldMessage = 'Required field. '
    let errorMessages = {}
    
    if (this.state.address.streetName === '') { 
      errorMessages.streetName = requiredFieldMessage
    }

    if (
      Number(this.state.address.streetNumber) === 0 ||
      isNaN(Number(this.state.address.streetNumber))
    ) {
      errorMessages.streetNumber = `${requiredFieldMessage}This is need to be a number.`
    }
    
    if (this.state.address.neighborhood === '') { 
      errorMessages.neighborhood = requiredFieldMessage
    }

    if (this.state.address.zip.length < 8) { 
      errorMessages.zip = `${requiredFieldMessage}This must be at least 8 characters.`
    }

    if (this.state.address.city === '') { 
      errorMessages.city = requiredFieldMessage      
    }

    if (this.state.address.state.length !== 2) { 
      errorMessages.state = `${requiredFieldMessage}This must have 2 characters.`         
    }

    if (this.state.address.country === '') { 
      errorMessages.country = requiredFieldMessage                  
    }

    if (Object.keys(errorMessages).length !== 0) {
      this.setState({
        errorMessages: {
          streetName: errorMessages.streetName,
          streetNumber: errorMessages.streetNumber,
          neighborhood: errorMessages.neighborhood,
          complement: errorMessages.complement,
          zip: errorMessages.zip,
          city: errorMessages.city,
          state: errorMessages.state,
          country: errorMessages.country    
        }
      })
      return false
    }

    this.setState({
      errorMessages: {
        streetName: '',
        streetNumber: '',
        neighborhood: '',
        complement: '',
        zip: '',
        city: '',
        state: '',
        country: ''    
      }
    })

    return true
  }

  handleOnZipBlur = () => {
    this.props.actions.getAddressByCep(this.state.address.zip)
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <h1>Address</h1>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Zip"
              value={this.state.address.zip}
              onChange={this.handleChange.bind(this, 'zip')}
              errorText={this.state.errorMessages.zip}
              fullWidth={true}
              onBlur={this.handleOnZipBlur} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Street Name"
              value={this.state.address.streetName}
              onChange={this.handleChange.bind(this, 'streetName')}
              errorText={this.state.errorMessages.streetName}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Street Number"
              value={this.state.address.streetNumber}
              onChange={this.handleChange.bind(this, 'streetNumber')}
              errorText={this.state.errorMessages.streetNumber}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Neighborhood"
              value={this.state.address.neighborhood}
              onChange={this.handleChange.bind(this, 'neighborhood')}
              errorText={this.state.errorMessages.neighborhood}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Complement"
              value={this.state.address.complement}
              onChange={this.handleChange.bind(this, 'complement')}
              errorText={this.state.errorMessages.complement}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="City"
              value={this.state.address.city}
              onChange={this.handleChange.bind(this, 'city')}
              errorText={this.state.errorMessages.city}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="State"
              value={this.state.address.state}
              onChange={this.handleChange.bind(this, 'state')}
              errorText={this.state.errorMessages.state}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Country"
              value={this.state.address.country}
              onChange={this.handleChange.bind(this, 'country')}
              errorText={this.state.errorMessages.country}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <hr/> 
            <hr/> 
            <RaisedButton 
              className="pull-left"            
              label="Previous Step"           
              onClick={this.handlePreviousStep} />           
            <RaisedButton 
              className="pull-right"            
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
  newContact: {
    address: {
      streetName: state.contactsReducer.newContact.address.streetName,
      neighborhood: state.contactsReducer.newContact.address.neighborhood,
      zip: state.contactsReducer.newContact.address.zip,
      city: state.contactsReducer.newContact.address.city,
      state: state.contactsReducer.newContact.address.state,
      country: state.contactsReducer.newContact.address.country
    }
  },
  newContactAddedMessage: state.contactsReducer.newContactAddedMessage
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormAddress)