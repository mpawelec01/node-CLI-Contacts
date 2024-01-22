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
      contactsFunctions.listContacts();
      break;
    case "get":
      contactsFunctions.getContactById(id);
      break;
    case "add":
      contactsFunctions.addContact(name, email, phone);
      break;
    case "remove":
      contactsFunctions.removeContact(id);
      break;

    default:
      console.warn("\x1B[31n Unknown action type!");
  }
}

invokeAction(argv);
