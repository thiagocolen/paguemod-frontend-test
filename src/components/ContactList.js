import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Link } from 'react-router-dom' //todo: remove this
import BootstrapTable from 'react-bootstrap-table-next'
import RaisedButton from 'material-ui/RaisedButton'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from'material-ui/svg-icons/action/delete'


import * as contactActions from '../actions'


class Contacts extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.props.actions.getAllContacts(this.props.auth)
    // this.editContact()
    // this.addContact()
    // this.deleteContact()
  }  

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
  
    if (nextProps.newContactAddedMessage === 'DELETED_CONTACT') {
      this.props.actions.clearNewContactAddedMessage()    
      this.props.actions.getAllContacts(this.props.auth)
    }
  }

  deleteContact () {
    let someContact = { 
      userInfo: { 
        name: 'EditedStringAgain',
        cpf: '12345678901',
        cnpj: '12345678901234',
        gender: 'm',
        website: 'String',
        email: 'String',
        telephone: 'String' 
      },
      address: { 
        streetName: 'String',
        streetNumber: 1,
        neighborhood: 'String',
        complement: 'String',
        zip: '12345678',
        city: 'String',
        state: 'SP',
        country: 'String' 
      },
      id:"-L7qkHyzMTvIkeWy48mU"
    }
    this.props.actions.deleteContact(someContact.id, this.props.auth)  
  }

  addContact () {
    let someContact = { 
      userInfo: { 
        name: 'NewString',
        cpf: '12345678901',
        cnpj: '12345678901234',
        gender: 'm',
        website: 'String',
        email: 'String',
        telephone: 'String' 
      },
      address: { 
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
    this.props.actions.addContact(someContact, this.props.auth)
  }

  editContact () {
    let someContact = { 
      userInfo: { 
        name: 'EditedStringAgain',
        cpf: '12345678901',
        cnpj: '12345678901234',
        gender: 'm',
        website: 'String',
        email: 'String',
        telephone: 'String' 
      },
      address: { 
        streetName: 'String',
        streetNumber: 1,
        neighborhood: 'String',
        complement: 'String',
        zip: '12345678',
        city: 'String',
        state: 'SP',
        country: 'String' 
      },
      id:"-L7qkHyzMTvIkeWy48mU" 
    }
    this.props.actions.editContact(someContact, someContact.id, this.props.auth)  
  }

  actionButtons = (cell, row, rowIndex) => {
    return(
      <div>
        <ModeEdit onClick={this.handleEditContact.bind(this, cell)} />
        <Delete onClick={this.handleDeleteContact.bind(this, cell)} />
      </div>
    )
  }

  contacTableColumns = [{
    dataField: 'userInfo.name',
    text: 'Name'
  }, {
    dataField: 'address.streetName',
    text: 'Address'
  }, {
    dataField: 'id',
    text: 'Actions',
    formatter: this.actionButtons.bind(this)
  }]

  emptyTable = () => (<h4>loading data</h4>)

  handleEditContact = (id) => {
    this.props.history.push('/edit-contact-step-1/' + id)
  }

  handleDeleteContact = (id) => {
    this.props.actions.deleteContact(id, this.props.auth)
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12">
            <h1>Contacts </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3 col-xs-offset-9">
            <Link to="/new-contact-step-1">
              <RaisedButton 
                label="New Contact" 
                primary={true} />           
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12">
            <BootstrapTable 
              keyField='id' 
              data={ this.props.contactList } 
              columns={ this.contacTableColumns }
              noDataIndication={ this.emptyTable }
              striped
              hover
              condensed />
          </div>
        </div>

      </div>
    )
  }
}


Contacts.propTypes = {
  auth: PropTypes.object,
  contactList: PropTypes.array,
  newContactAddedMessage: PropTypes.string
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  contactList: state.contactsReducer.contactList,
  newContactAddedMessage: state.contactsReducer.newContactAddedMessage
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
