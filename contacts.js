const fs = require("fs").promises;
const path = require("node:path");
require("colors");

const contactsPath = path.format({
  root: "db/",
  base: "contacts.json",
});

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  try {
    const parsedContacts = JSON.parse(contacts);
    console.log("Contacts list:".yellow);
    console.table(parsedContacts);
  } catch (err) {
    console.log(err.message);
  }
}

async function getContactById(contactId) {
  const contacts = await fs.readFile(contactsPath);
  try {
    const parsedContacts = JSON.parse(contacts);
    const searchedContact = parsedContacts.find(
      (contact) => contact.id === contactId
    );
    console.log("Searched contact:".yellow);
    console.table(searchedContact);
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  const contacts = await fs.readFile(contactsPath);

  try {
    const parsedContacts = JSON.parse(contacts);
    const newContacts = [...parsedContacts, { name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log("Contact successfully added".yellow);
  } catch (err) {
    console.log(err.message);
  }
}

async function removeContact(contactId) {
  const contacts = await fs.readFile(contactsPath);

  try {
    const parsedContacts = JSON.parse(contacts);
    const actualContacts = parsedContacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(actualContacts));
    console.log("Contact successfully removed".yellow);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
