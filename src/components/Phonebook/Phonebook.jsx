import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';

import css from './Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [],
  };

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const localStorageContact = localStorage.getItem('contacts');
    if (localStorageContact) {
      this.setState({ contacts: JSON.parse(localStorageContact) });
    }
  }

  addContact = newContact => {
    let existedContact = this.state.contacts.some(
      contact =>
        contact.name === newContact.name && contact.number === newContact.number
    );
    if (existedContact) {
      Notify.warning('This contact already exists');
      return;
    }
    newContact.id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = index => {
    this.setState(prevState => {
      const updatedContacts = [...prevState.contacts];
      updatedContacts.splice(index, 1);
      return { contacts: updatedContacts };
    });
  };
  render() {
    return (
      <div>
        <div className={css.phonebook}>
          <ContactForm addContact={this.addContact} />
        </div>
        <ContactList
          contacts={this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

Phonebook.propTypes = {
  contacts: PropTypes.array,
};

export default Phonebook;
