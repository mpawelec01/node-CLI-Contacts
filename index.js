const contactsFunctions = require("./contacts.js");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <string>", "choose action")
  .option("-i, --id <string>", "user id")
  .option("-n, --name <string>", "user name")
  .option("-e, --email <string>", "user email")
  .option("-p, --phone <string>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      async function list() {
        try {
          await contactsFunctions.listContacts();
        } catch (err) {
          console.log(err.message);
        }
      }
      list();
      break;
    case "get":
      async function get() {
        try {
          await contactsFunctions.getContactById(id);
        } catch (err) {
          console.log(err.message);
        }
      }
      get();
      break;
    case "add":
      async function add() {
        try {
          await contactsFunctions.addContact(name, email, phone);
        } catch (err) {
          console.log(err.message);
        }
      }
      add();
      break;
    case "remove":
      async function remove() {
        try {
          await contactsFunctions.removeContact(id);
        } catch (err) {
          console.log(err.message);
        }
      }
      remove();
      break;

    default:
      console.warn("\x1B[31n Unknown action type!");
  }
}

invokeAction(argv);
