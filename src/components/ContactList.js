import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Link } from 'react-router-dom' //todo: remove this
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import RaisedButton from 'material-ui/RaisedButton'
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import Delete from'material-ui/svg-icons/action/delete'


import * as contactActions from '../actions'


class Contacts extends React.Component {

  componentDidMount() {
    this.props.actions.getAllContacts(this.props.auth)
  }  

  componentWillReceiveProps(nextProps) {
    if (nextProps.newContactAddedMessage === 'DELETED_CONTACT') {
      this.props.actions.clearNewContactAddedMessage()    
      this.props.actions.getAllContacts(this.props.auth)
    }
  }

  actionButtons = (cell, row, rowIndex) => {
    return(
      <div>
        <ModeEdit onClick={this.handleEditContact.bind(this, cell)} />
        <Delete onClick={this.handleDeleteContact.bind(this, cell)} />
      </div>
    )
  }

  contacTableColumns = [
    {
      dataField: 'userInfo.name',
      text: 'Name'
    }, {
      dataField: 'address.streetName',
      text: 'Address'
    }, {
      dataField: 'id',
      text: '',
      classes: 'text-right',
      headerStyle: { width: '80px' },
      formatter: this.actionButtons.bind(this)
    }
  ]

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
          <div className="col-xs-7 col-xs-offset-1">
            <h1>Clients</h1>
            <br/>
          </div>
          <div className="col-xs-3 text-right">
            <RaisedButton 
              label="New Contact" 
              primary={true}
              style={{marginTop: '20px'}}
              onClick={() => this.props.history.push('/new-contact-step-1')} />
          </div>
        </div>

        <div className="row">
          <div className="col-xs-10 col-xs-offset-1">
            <BootstrapTable 
              keyField='id' 
              data={ this.props.contactList } 
              columns={ this.contacTableColumns }
              noDataIndication={ this.emptyTable }
              pagination={ paginationFactory() }
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
  newContactAddedMessage: state.contactsReducer.newContactAddedMessage,
})

const mapDispatchToProps = (dispatch) => {
	return {
    actions: bindActionCreators({ ...contactActions }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
