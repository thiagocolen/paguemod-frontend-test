import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllContacts } from '../actions'

class Contacts extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('componentDidMount')
    console.log(this.props)
    this.props.actions.getAllContacts()
  }  

  render() {
    return (
      <h1>contacts Component</h1>
    )
  }
}


Contacts.propTypes = {
  contactList: PropTypes.any
}

const mapStateToProps = (state) => ({
  contactList: state.contactsReducer.contactList
})

function mapDispatchToProps(dispatch) {
	return {
    actions: bindActionCreators({ getAllContacts }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts)
