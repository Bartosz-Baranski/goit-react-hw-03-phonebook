import React, { Component } from 'react';

import css from './ContactList.module.css';

class ContactList extends Component {
  state = {
    filter: '',
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  getContacts = () => {
    const filter = this.state.filter;
    const contacts = this.props.contacts;
    if (filter.length === 0) {
      return contacts;
    }

    return contacts.filter(
      contact => contact.name.toLowerCase().indexOf(filter) >= 0
    );
  };
  
  render() {
    return (
      <div>
        <h2>Contacts</h2>
        <form className={css.contact_list}>
          <label className={css.phonebook_label}>
            Find contacts by name
            <input
              type="text"
              name="filter"
              value={this.state.filter}
              onChange={this.handleChange}
            ></input>
          </label>
        </form>

        <ul className={css.contact_list}>
          {this.getContacts().map(({ name, number, id }, index) => (
            <li key={id} className={css.contact_element}>
              {name} {number}
              <button
                className={css.btn_delete}
                onClick={() => this.props.deleteContact(index)}
              >
                Delete contact
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
export default ContactList;
