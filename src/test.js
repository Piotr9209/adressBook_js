// constructor() {
//     this.listOfAllContacts = [];
//     this.listOfAllGroups = [];
//     this.listOfAllContactsInGroups = [];

// }
// addContactsToListOfContacts = (...contacts) => {
//     contacts.forEach(contact => {
//         if (!Validator.isContact(contact)) {
//             return false;
//         }
//         this.listOfAllContacts.push(contact);
//     })
// }


// addGroupToListOfGroups = (...nameGroup) => {
//     nameGroup.forEach(name => {
//         if (!Validator.isGroupContact(name)) return false;
//         this.listOfAllGroups.push(name);
//     })
// }


// addContactsToGroup = (contact, groupContact) => {

//     const listOfContactsIncludesContact = this.listOfAllContacts.map(cont => cont.uuid);
//     const listOfGroupIncludesGroup = this.listOfAllGroups.map(group => group.uuid);
//     const duplicateContact = this.listOfAllContactsInGroups.map(cont => cont.uuid);


//     if (!Validator.isContact(contact)) return false;
//     if (!Validator.isGroupContact(groupContact)) return false;

//     if (duplicateContact.includes(contact.uuid)) {
//         return 'contact is a signned to a group'
//     }

//     if (listOfContactsIncludesContact.includes(contact.uuid) && listOfGroupIncludesGroup.includes(groupContact.uuid)) {
//         this.listOfAllContactsInGroups.push(contact, groupContact);
//         return this.listOfAllContactsInGroups;
//     }
// }

// deleteContact = (uuid) => {
//     Validator.isEmptyString(uuid);
//     const contactInAllContacts = this.listOfAllContacts.find((contactItem) => contactItem.uuid === uuid);
//     const contactInAllContactsInGroups = this.listOfAllContactsInGroups.find((contactItem) => contactItem.uuid === uuid);

//     if (this.listOfAllContacts.includes(contactInAllContacts) && this.listOfAllContactsInGroups.includes(contactInAllContactsInGroups)) {
//         const allContacts = this.listOfAllContacts.filter((contactItem) => {
//             return contactItem.uuid !== contactInAllContacts.uuid
//         })

//         const allContactsInGroup = this.listOfAllContactsInGroups.filter((contactItem) => {
//             return contactItem.uuid !== contactInAllContactsInGroups.uuid;
//         })
//         return (this.listOfAllContacts = allContacts, this.listOfAllContactsInGroups = allContactsInGroup)

//     }
//     return 'args not found'
// }