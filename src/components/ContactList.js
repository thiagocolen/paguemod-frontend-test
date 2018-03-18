import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BootstrapTable from 'react-bootstrap-table-next'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'

import * as contactActions from '../actions'


class Contacts extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.props.actions.getAllContacts()
    // this.editContact()
    // this.addContact()
    // this.deleteContact()
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
    this.props.actions.deleteContact(someContact.id)  
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
    this.props.actions.addContact(someContact)
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
    this.props.actions.editContact(someContact, someContact.id)  
  }

  render() {
    return (
      <div className="container">

        <div className="row">
          <div className="col-xs-12">
            <h1>contacts Component</h1>
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
              columns={ contacTableColumns }
              striped
              hover
              condensed />
          </div>
        </div>

      </div>
    )
  }
}

const contacTableColumns = [{
  dataField: 'id',
  text: 'ID',
  hidden: true
}, {
  dataField: 'userInfo.name',
  text: 'Name'
}, {
  dataField: 'address.streetName',
  text: 'Address'
}]

Contacts.propTypes = {
  contactList: PropTypes.array
}

const mapStateToProps = (state) => ({
  contactList: state.contactsReducer.contactList
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
