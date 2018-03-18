import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as contactActions from '../actions'

class Contacts extends React.Component {
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
      <div>
        <h1>contacts Component</h1>
        {
          this.props.contactList.map(item => (
            <p key={item.id}>{item.userInfo.name}</p>
          ))
        }        
      </div>
    )
  }
}


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
