import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'

import * as contactActions from '../actions'


class ContactFormUserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pessoa: '',
      errorMessages: {
        pessoa: '',
        name: '',
        cpf: '',
        cnpj: '',
        gender: '',
        website: '',
        email: '',
        telephone: '' 
      },
      userInfo: {
        name: '',
        cpf: '',
        cnpj: '',
        gender: '',
        website: '',
        email: '',
        telephone: '' 
      }
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    if (
      this.props.match.path === '/edit-contact-step-1/:id' &&
      this.props.newContact.id === undefined
    ) {
      this.props.actions.getAllContacts(this.props.auth)
      return
    }

    if (
      this.props.match.path === '/edit-contact-step-1/:id' &&
      this.props.newContact.id !== undefined
    ) {
      this.setState({ userInfo: this.props.newContact.userInfo })
      return
    }

  }  

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.newContact)

    if (
      nextProps.contactList.length > 0 &&
      nextProps.newContact.id === undefined
    ) {
      let selectedContact = nextProps.contactList.filter(item => {
        return item.id === this.props.match.params.id
      })

      this.props.actions.addSelectedContactToForm(selectedContact[0])
    }

    if (nextProps.newContact.id !== undefined) {  
      this.setState({ userInfo: nextProps.newContact.userInfo })
    }
  }

  handleTextFieldChange = (prop, event, newValue) => {
    this.setState({ 
      userInfo: { 
        ...this.state.userInfo,
        [prop]: newValue 
      } 
    })
  }

  handleSelectFieldChange = (prop, event, key, newValue) => {
    this.setState({ 
      userInfo: { 
        ...this.state.userInfo,
        [prop]: newValue 
      } 
    })
  }

  handleRadioChange = (event, newValue) => {
    this.setState({ 
      pessoa: newValue,
      userInfo: { 
        ...this.state.userInfo,
      } 
    })

    if (newValue === 'pf') {
      this.setState({ 
        pessoa: newValue,
        userInfo: { 
          ...this.state.userInfo,
          cnpj: '',
          website: '',
        } 
      })  
    }

    if (newValue === 'pj') {
      this.setState({ 
        pessoa: newValue,
        userInfo: { 
          ...this.state.userInfo,
          cpf: '',
          gender: '',
        } 
      })  
    }
  }

  handleNextStep = () => {
    if (this.formValidation()) {
      this.props.actions.newContactUserInfo(this.state)
  
      if (this.props.match.path === '/edit-contact-step-1/:id') { 
        this.props.history.push('/edit-contact-step-2/' + this.props.match.params.id)
        return     
      }
      this.props.history.push('/new-contact-step-2')
    }
  }
  
  handleCancel = () => {
    this.props.actions.newContactCancel()
    this.props.history.push('/contacts')
  }

  formValidation = () => {
    let requiredFieldMessage = 'Required field. '
    let errorMessages = {}
    
    if (this.state.userInfo.email === '') {
      errorMessages.email = requiredFieldMessage
    }
    
    if (this.state.userInfo.name === '') { 
      errorMessages.name = requiredFieldMessage
    }

    if (this.state.userInfo.telephone === '') { 
      errorMessages.telephone = requiredFieldMessage
    }

    if (this.state.pessoa === '') { 
      errorMessages.pessoa = requiredFieldMessage
    }

    if ( (
        this.state.pessoa === 'pf' &&
        this.state.userInfo.cpf.length !== 11 ||
        this.state.userInfo.gender === ''
      ) && (
        this.state.pessoa === 'pj' &&
        this.state.userInfo.cnpj.length !== 14 ||
        this.state.userInfo.website === ''
      ) ) {
        if (this.state.pessoa === 'pf') {
          errorMessages.cpf = `${requiredFieldMessage}This must have 11 characters.`
          errorMessages.gender = requiredFieldMessage
        } 

        if (this.state.pessoa === 'pj') {
          errorMessages.cnpj = `${requiredFieldMessage}This must have 14 characters.`
          errorMessages.website = requiredFieldMessage
        }
      }

    if (Object.keys(errorMessages).length !== 0) {
      this.setState({
        errorMessages: {
          pessoa: errorMessages.pessoa,
          name: errorMessages.name,
          cpf: errorMessages.cpf,
          cnpj: errorMessages.cnpj,
          gender: errorMessages.gender,
          website: errorMessages.website,
          email: errorMessages.email,
          telephone: errorMessages.telephone         
        }
      })
      return false
    }

    this.setState({
      errorMessages: {
        pessoa: '',
        name: '',
        cpf: '',
        cnpj: '',
        gender: '',
        website: '',
        email: '',
        telephone: ''         
      }
    })

    return true
  }

  render() {
    return (
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
              value={this.state.userInfo.name}
              onChange={this.handleTextFieldChange.bind(this, 'name')}
              errorText={this.state.errorMessages.name}
              fullWidth={true} />
          </div>
        </div>
        
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="e-mail"
              value={this.state.userInfo.email}
              onChange={this.handleTextFieldChange.bind(this, 'email')}
              errorText={this.state.errorMessages.email}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <TextField
              floatingLabelText="Telephone"
              value={this.state.userInfo.telephone}
              onChange={this.handleTextFieldChange.bind(this, 'telephone')}
              errorText={this.state.errorMessages.telephone}
              fullWidth={true} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <hr/>
            <RadioButtonGroup name='genderRadioButtonGroup' onChange={this.handleRadioChange}>
              <RadioButton value="pf" label="Pessoa Física" />
              <RadioButton value="pj" label="Pessoa Jurídica" />
            </RadioButtonGroup>
            { this.state.errorMessages.pessoa ?
              <h6 style={{color: 'red'}}>{this.state.errorMessages.pessoa}</h6>
            : ''}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
          { this.state.pessoa === 'pf' ? (
            <TextField
              floatingLabelText="CPF"
              value={this.state.userInfo.cpf}
              onChange={this.handleTextFieldChange.bind(this, 'cpf')}
              errorText={this.state.errorMessages.cpf}
              fullWidth={true} />
          ) : '' }
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
          { this.state.pessoa === 'pj' ? (          
            <TextField
              floatingLabelText="CNPJ"
              value={this.state.userInfo.cnpj}
              onChange={this.handleTextFieldChange.bind(this, 'cnpj')}
              errorText={this.state.errorMessages.cnpj}
              fullWidth={true} />
          ) : '' }
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            {/* valores 'm' e 'f' estão 'hardcoded', 
            isso não é bom, seria melhor se viessem da API */}
            { this.state.pessoa === 'pf' ? (
              <SelectField
                floatingLabelText="Gender"
                value={this.state.userInfo.gender}
                onChange={this.handleSelectFieldChange.bind(this, 'gender')}
                errorText={this.state.errorMessages.gender}
                fullWidth={true} >
                <MenuItem value={'m'} primaryText="Masculino" />
                <MenuItem value={'f'} primaryText="Feminino" />
              </SelectField>
            ) : '' }
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            { this.state.pessoa === 'pj' ? (          
              <TextField
                floatingLabelText="Website"
                value={this.state.userInfo.website}
                onChange={this.handleTextFieldChange.bind(this, 'website')}
                errorText={this.state.errorMessages.website}
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
    ) 
  }
}

ContactFormUserInfo.propTypes = {
  auth: PropTypes.object,
  contactList: PropTypes.array
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,  
  contactList: state.contactsReducer.contactList,
  newContact: state.contactsReducer.newContact
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactFormUserInfo)