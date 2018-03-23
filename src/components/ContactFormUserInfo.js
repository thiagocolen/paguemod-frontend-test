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

  handleChange = (prop, event, newValue) => {
    this.setState({ 
      userInfo: { 
        ...this.state.userInfo,
        [prop]: newValue 
      } 
    })
  }

  handleNextStep = () => {
    this.props.actions.newContactUserInfo(this.state.userInfo)
    if (this.props.match.path === '/edit-contact-step-1/:id') { 
      this.props.history.push('/edit-contact-step-2/' + this.props.match.params.id)
      return     
    }
    this.props.history.push('/new-contact-step-2')
  }
  
  handleCancel = () => {
    this.props.actions.newContactCancel()
    this.props.history.push('/contacts')
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
              value={this.state.userInfo.name}
              onChange={this.handleChange.bind(this, 'name')}  />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="CPF"
              value={this.state.userInfo.cpf}
              onChange={this.handleChange.bind(this, 'cpf')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="CNPJ"
              value={this.state.userInfo.cnpj}
              onChange={this.handleChange.bind(this, 'cnpj')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Gender"
              value={this.state.userInfo.gender}
              onChange={this.handleChange.bind(this, 'gender')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Website"
              value={this.state.userInfo.website}
              onChange={this.handleChange.bind(this, 'website')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="e-mail"
              value={this.state.userInfo.email}
              onChange={this.handleChange.bind(this, 'email')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <TextField
              floatingLabelText="Telephone"
              value={this.state.userInfo.telephone}
              onChange={this.handleChange.bind(this, 'telephone')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-6">
            <RaisedButton
              label="Cancel" 
              primary={true}
              onClick={this.handleCancel} />           
          </div>      
          <div className="col-xs-6">
            <RaisedButton
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