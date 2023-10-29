import React, { Component } from 'react';
import css from './Phonebook.module.css';
import PropTypes from 'prop-types';
import ContactForm from 'components/contactForm/contactForm';
import ContactList from 'components/ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class Phonebook extends Component {
  state = {
    contacts: [],
  };
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
