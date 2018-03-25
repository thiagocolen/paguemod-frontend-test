import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Snackbar from 'material-ui/Snackbar'

import * as contactActions from '../actions'


class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snackbarOpen: false,         
      pessoaErrorMessage: '',
      nameErrorMessage: '',
      cpfErrorMessage: '',
      cnpjErrorMessage: '',
      genderErrorMessage: '',
      websiteErrorMessage: '',
      emailErrorMessage: '',
      telephoneErrorMessage: '',
      streetNameErrorMessage: '',
      streetNumberErrorMessage: '',
      neighborhoodErrorMessage: '',
      zipErrorMessage: '',
      cityErrorMessage: '',
      stateErrorMessage: '',
      countryErrorMessage: '',  
      userInfoForm: true,
      addressForm: false      
    }
  }

  componentDidMount() {
    if (this.props.match.path === '/edit-contact/:id') {
      this.props.actions.getContact(
        this.props.auth, 
        this.props.match.params.id
      )
    }
  }  

  handleTextFieldChange = (prop, event, newValue) => {
    this.props.actions.updateContactToForm(prop, newValue)
  }

  handleSelectFieldChange = (prop, event, key, newValue) => {
    this.props.actions.updateContactToForm(prop, newValue)    
  }

  handleOnZipBlur = () => {
    this.props.actions.getAddressByCep(this.props.zip)
  }

  handleNextStep = () => {
    if (this.formValidation(this.props)) {
      this.setState({
        userInfoForm: false,
        addressForm: true
      })
    }
  }

  handlePreviousStep = () => {
    this.setState({
      userInfoForm: true,
      addressForm: false
    })    
  }
  
  handleCancel = () => {
    this.props.actions.clearContactForm()
    this.props.history.push('/contacts')
  }

  handleSaveContact = () => {
    let contact = {
      userInfo: {},
      address: {}
    }

    if (this.formValidation(this.props)) {
      contact.address = {
        streetName: this.props.streetName,
        streetNumber: Number(this.props.streetNumber),
        neighborhood: this.props.neighborhood,
        complement: this.props.complement,
        zip: this.props.zip,
        city: this.props.city,
        state: this.props.state,
        country: this.props.country, 
      }

      if (this.props.cpf) {
        contact.userInfo = {
          name: this.props.name,
          cpf: this.props.cpf,
          gender: this.props.gender,
          email: this.props.email,
          telephone: this.props.telephone,
        }
      }

      if (this.props.cnpj) {
        contact.userInfo = {
          name: this.props.name,
          cnpj: this.props.cnpj,
          website: this.props.website,
          email: this.props.email,
          telephone: this.props.telephone,            
        }
      }
      
      if (this.props.match.path === '/new-contact') {
        this.props.actions.addContact(contact, this.props.auth)
          .then(() => this.setState({ snackbarOpen: true }))
      }

      if (this.props.match.path === '/edit-contact/:id') {        
        this.props.actions.editContact(
          contact, 
          this.props.match.params.id, 
          this.props.auth
        )        
        .then(() => this.setState({ snackbarOpen: true }))
      }
    } 
  }

  formValidation = (form) => {
    let requiredFieldMessage = 'Required field. '
    let errors = []
    
    if (this.state.userInfoForm === true) {

      if (form.email === '') {
        errors.push(true)
        this.setState({ emailErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ emailErrorMessage: '' })
      }

      if (form.name === '') {
        errors.push(true)
        this.setState({ nameErrorMessage: requiredFieldMessage })
      } else {                
        this.setState({ nameErrorMessage: '' })
      }

      if (form.telephone === '' || isNaN(Number(form.telephone))) {
        errors.push(true)
        this.setState({ telephoneErrorMessage: `${requiredFieldMessage}This is need to be a number.` })
      } else {                
        this.setState({ telephoneErrorMessage: '' })
      }

      if (form.pessoa === '') {
        errors.push(true)
        this.setState({ pessoaErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ pessoaErrorMessage: '' })
      }

      if (
        form.pessoa === 'pf' && 
        (isNaN(Number(form.cpf)) || form.cpf.length !== 11)
      ) {
        errors.push(true)
        this.setState({ cpfErrorMessage: `${requiredFieldMessage}This is need to be a number and must have 11 characters.` })
      } else {        
        this.setState({ cpfErrorMessage: '' })
      }

      if (form.pessoa === 'pf' && form.gender === '') {
        errors.push(true)
        this.setState({ genderErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ genderErrorMessage: '' })
      }
      
      if (
        form.pessoa === 'pj' &&
        (isNaN(Number(form.cnpj)) || form.cnpj.length !== 14)
      ) {
        errors.push(true)
        this.setState({ cnpjErrorMessage: `${requiredFieldMessage}This is need to be a number and must have 14 characters.` })
      } else {        
        this.setState({ cnpjErrorMessage: '' })
      }
      
      if (form.pessoa === 'pj' && form.website === '') {
        errors.push(true)
        this.setState({ websiteErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ websiteErrorMessage: '' })
      }

    }

    if (this.state.addressForm === true) {

      if (form.streetName === '') {
        errors.push(true)
        this.setState({ streetNameErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ streetNameErrorMessage: '' })
      }

      if (
        Number(form.streetNumber) === 0 ||
        isNaN(Number(form.streetNumber))
      ) {
        errors.push(true)
        this.setState({ streetNumberErrorMessage: `${requiredFieldMessage}This is need to be a number.` })
      } else {        
        this.setState({ streetNumberErrorMessage: '' })
      }

      if (form.neighborhood === '') {
        errors.push(true)
        this.setState({ neighborhoodErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ neighborhoodErrorMessage: '' })
      }

      if (
        Number(form.zip.length) < 8 ||
        isNaN(Number(form.zip))
      ) {
        errors.push(true)
        this.setState({ zipErrorMessage: `${requiredFieldMessage}This is need to be a number and must be at least 8 characters.` })
      } else {        
        this.setState({ zipErrorMessage: '' })
      }

      if (form.city === '') {
        errors.push(true)
        this.setState({ cityErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ cityErrorMessage: '' })
      }

      if (form.country === '') {
        errors.push(true)
        this.setState({ countryErrorMessage: requiredFieldMessage })
      } else {        
        this.setState({ countryErrorMessage: '' })
      }

      if (form.state.length !== 2) {
        errors.push(true)
        this.setState({ stateErrorMessage: `${requiredFieldMessage}This must have 2 characters.` })
      } else {        
        this.setState({ stateErrorMessage: '' })
      }    
    }

    return errors.length === 0 ? true : false
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false })
    this.props.actions.clearContactForm()
    setTimeout(() => {
      this.props.history.push('/contacts')                
    }, 100)
  }

  render() {
    return (
      <div>
        { this.state.userInfoForm === true ? (
          <div className="container">
            
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <h1>User Info</h1>
                <hr/>
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Name"
                  value={this.props.name}
                  onChange={this.handleTextFieldChange.bind(this, 'name')}
                  errorText={this.state.nameErrorMessage}
                  fullWidth={true} />
              </div>
            </div>
            
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="e-mail"
                  value={this.props.email}
                  onChange={this.handleTextFieldChange.bind(this, 'email')}
                  errorText={this.state.emailErrorMessage}
                  fullWidth={true} />
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Telephone"
                  value={this.props.telephone}
                  onChange={this.handleTextFieldChange.bind(this, 'telephone')}
                  errorText={this.state.telephoneErrorMessage}
                  fullWidth={true} />
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <hr/>
                <RadioButtonGroup 
                  name='genderRadioButtonGroup' 
                  onChange={this.handleTextFieldChange.bind(this, 'pessoa')}
                  valueSelected={this.props.pessoa}>
                  <RadioButton value="pf" label="Pessoa Física" />
                  <RadioButton value="pj" label="Pessoa Jurídica" />
                </RadioButtonGroup>
                { this.state.pessoaErrorMessage ?
                  <h6 style={{color: 'red'}}>{this.state.pessoaErrorMessage}</h6>
                : ''}
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
              { this.props.pessoa === 'pf' ? (
                <TextField
                  floatingLabelText="CPF"
                  value={this.props.cpf}
                  onChange={this.handleTextFieldChange.bind(this, 'cpf')}
                  errorText={this.state.cpfErrorMessage}
                  fullWidth={true} />
              ) : '' }
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
              { this.props.pessoa === 'pj' ? (          
                <TextField
                  floatingLabelText="CNPJ"
                  value={this.props.cnpj}
                  onChange={this.handleTextFieldChange.bind(this, 'cnpj')}
                  errorText={this.state.cnpjErrorMessage}
                  fullWidth={true} />
              ) : '' }
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                {/* valores 'm' e 'f' estão 'hardcoded', 
                isso não é bom, seria melhor se viessem da API */}
                { this.props.pessoa === 'pf' ? (
                  <SelectField
                    floatingLabelText="Gender"
                    value={this.props.gender}
                    onChange={this.handleSelectFieldChange.bind(this, 'gender')}
                    errorText={this.state.genderErrorMessage}
                    fullWidth={true} >
                    <MenuItem value={'m'} primaryText="Masculino" />
                    <MenuItem value={'f'} primaryText="Feminino" />
                  </SelectField>
                ) : '' }
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                { this.props.pessoa === 'pj' ? (          
                  <TextField
                    floatingLabelText="Website"
                    value={this.props.website}
                    onChange={this.handleTextFieldChange.bind(this, 'website')}
                    errorText={this.state.websiteErrorMessage}
                    fullWidth={true} />
                ) : '' }
              </div>
            </div>
    
            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <hr/> 
                <hr/> 
                <RaisedButton
                  className="pull-left"
                  label="Cancel" 
                  onClick={this.handleCancel} />           
                <RaisedButton
                  className="pull-right"
                  label="Next Step" 
                  primary={true}
                  onClick={this.handleNextStep} />           
              </div>      
            </div>
  
          </div>
        ) : '' }

        { this.state.addressForm === true ? (
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
                  value={this.props.zip}
                  onChange={this.handleTextFieldChange.bind(this, 'zip')}
                  errorText={this.state.zipErrorMessage}
                  fullWidth={true}
                  onBlur={this.handleOnZipBlur} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Street Name"
                  value={this.props.streetName}
                  onChange={this.handleTextFieldChange.bind(this, 'streetName')}
                  errorText={this.state.streetNameErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Street Number"
                  value={this.props.streetNumber}
                  onChange={this.handleTextFieldChange.bind(this, 'streetNumber')}
                  errorText={this.state.streetNumberErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Neighborhood"
                  value={this.props.neighborhood}
                  onChange={this.handleTextFieldChange.bind(this, 'neighborhood')}
                  errorText={this.state.neighborhoodErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Complement"
                  value={this.props.complement}
                  onChange={this.handleTextFieldChange.bind(this, 'complement')}
                  errorText={this.state.complementErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="City"
                  value={this.props.city}
                  onChange={this.handleTextFieldChange.bind(this, 'city')}
                  errorText={this.state.cityErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="State"
                  value={this.props.state}
                  onChange={this.handleTextFieldChange.bind(this, 'state')}
                  errorText={this.state.stateErrorMessage}
                  fullWidth={true} />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-6 col-xs-offset-3">
                <TextField
                  floatingLabelText="Country"
                  value={this.props.country}
                  onChange={this.handleTextFieldChange.bind(this, 'country')}
                  errorText={this.state.countryErrorMessage}
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
              message={this.props.apiReponse}
              autoHideDuration={3000}
              onRequestClose={this.handleSnackbarClose} />

          </div>
        ) : ''}
      </div>
    ) 
  }
}

ContactForm.propTypes = {
  auth: PropTypes.object,
  apiReponse: PropTypes.string,
  contactList: PropTypes.array,
  pessoa: PropTypes.string, 
  name: PropTypes.string,
  cpf: PropTypes.string,
  cnpj: PropTypes.string,
  gender: PropTypes.string,
  website: PropTypes.string,
  email: PropTypes.string,
  telephone: PropTypes.string, 
  streetName: PropTypes.string,
  streetNumber: PropTypes.string,
  neighborhood: PropTypes.string,
  complement: PropTypes.string,
  zip: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  country: PropTypes.string  
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,  
  apiReponse: state.contactsReducer.apiResponse,
  contactList: state.contactsReducer.contactList,
  pessoa: state.contactsReducer.pessoa,
  name: state.contactsReducer.contact.name,
  cpf: state.contactsReducer.contact.cpf,
  cnpj: state.contactsReducer.contact.cnpj,
  gender: state.contactsReducer.contact.gender,
  website: state.contactsReducer.contact.website,
  email: state.contactsReducer.contact.email,
  telephone: state.contactsReducer.contact.telephone,
  streetName: state.contactsReducer.contact.streetName,
  streetNumber: state.contactsReducer.contact.streetNumber,
  neighborhood: state.contactsReducer.contact.neighborhood,
  complement: state.contactsReducer.contact.complement,
  zip: state.contactsReducer.contact.zip,
  city: state.contactsReducer.contact.city,
  state: state.contactsReducer.contact.state,
  country: state.contactsReducer.contact.country  
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm)