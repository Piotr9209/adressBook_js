// "1) Stwórz strukturę danych związaną z książką adresową.

// Obiekt 
// książka adresowa 
// Ma mieć: listę wszystkich kontaktów, listę grup kontaktów.
// Ma umożliwiać: można szukać kontaktu po frazie, można dodać kontakt do grupy

//     Obiekt charakteryzujący pojedyńczy kontak:
//     Ma mieć: Imie, Nazwisko, adres - emial, datę modyfikacji / utworzenia, uuid
// Ma umożliwiać: aktualizację datę modyfikacji, wyświetlać
// w odpowiednim formacie przy wywołaniu, pozwalac na modyfikację imienia, nazwiska oraz adresu email

// Obiekt charakteryzujący grupę kontaktów:
//     Ma mieć: listę kontaktów
// Ma umożliwiać: Można zmienić nazwę grupy, można dodać lub usunac kontakt z grupy "				

import {
    v4 as uuidv4
} from 'uuid';


class Validator {
    static isEmptyString(stringLikeValue) {
        const notaString = typeof stringLikeValue !== 'string'
        const lengthIsNotZero = stringLikeValue.length !== 0

        const cond = (notaString || lengthIsNotZero)
        if (!cond) throw new Error('Params must be string')
    }

    static isWrongEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) throw new Error('Email must be a letter and must contain between 3-25 characters, and must have special characters "@"')
    }
    static isContact(value) {
        return value instanceof Contact;
    }

    static isGroupContact(value) {
        return value instanceof GroupContact;
    }
}

class AddressBook {
    constructor() {
        this.listOfContacts = [];
        this.listOfGroups = [];
    }

    addContacts(...arrayOfContacts) {
        arrayOfContacts.forEach(contact => {
            if (!Validator.isContact(contact)) return (`contact doesn't includes to class Contact`);
            if (!this.listOfContacts.find(contactFind => contactFind.uuid === contact.uuid)) {
                this.listOfContacts.push(contact);
            } else {
                return 'contact is in list of contacts'
            }
        })
    }

    addGroups(groupContact) {
        if (!Validator.isGroupContact(groupContact)) return (`group doesn't includes to class group Contact`)
        if (!this.listOfGroups.find(group => group.uuid === groupContact.uuid)) {
            this.listOfGroups.push(groupContact)
        } else {
            return (`group is in list of`)
        }
    }

    searchContactFromPhrase(phrase) {
        return this.listOfContacts.filter(contact => {
            if (phrase.length < 0 && typeof phrase !== "string") {
                return `args not found`
            }
            return contact.name.toLowerCase().includes(phrase.toLowerCase()) || contact.surname.toLowerCase().includes(phrase.toLowerCase()) || contact.email.toLowerCase().includes(phrase.toLowerCase());
        })
    }

    searchContact(phrase) {
        return this.listOfGroups.map(contact => {
            return contact.contacts.filter(contactSearch => {
                if (phrase.length < 0 && typeof phrase !== "string") {
                    return `args not found`
                }
                return contactSearch.name.toLowerCase().includes(phrase.toLowerCase()) || contactSearch.surname.toLowerCase().includes(phrase.toLowerCase()) || contactSearch.email.toLowerCase().includes(phrase.toLowerCase())
            })
        })
    }
}

class Contact {
    constructor(name, surname, email) {
        Validator.isEmptyString(name)
        Validator.isEmptyString(surname)
        Validator.isWrongEmail(email)

        this.uuid = uuidv4()
        this.name = name
        this.surname = surname
        this.email = email
        this.updatedDate = Date.now()
    }
    updateDate() {
        this.updatedDate = Date.now()
    }

    show() {
        return (
            `
            Imię: ${this.name},
            Nazwisko: ${this.surname},
            Email: ${this.email},
            Data utworzenia: ${this.updatedDate},
            ID:${this.uuid}
            `
        )
    }

    update(key, value) {
        if (!['name', 'surname', 'email'].includes(key)) {
            throw new Error(`${key} is a wrong key`)
        }
        if (key === 'email') {
            Validator.isWrongEmail(value)
        } else {
            Validator.isEmptyString(value)
        }
        this[key] = value
        this.updateDate();
    }
}

class GroupContact {
    constructor(nameGroup) {
        Validator.isEmptyString(nameGroup);
        this.uuid = uuidv4();
        this.name = nameGroup;
        this.contacts = []
    }


    addContacts(...contacts) {
        contacts.forEach(contact => {
            if (!Validator.isContact(contact)) return `contact doesn't includes in object Contact`;
            if (!this.contacts.find(contactFind => contactFind.uuid === contact.uuid)) {
                this.contacts.push(contact)
            } else {
                return (`contact is in a group`)
            }
        })
    }

    remove(...contacts) {
        contacts.forEach(contact => {
            if (!Validator.isContact(contact)) return `contact doesn't includes in object Contact`;
            if (this.contacts.find(contactFind => contactFind.uuid === contact.uuid)) {
                this.contacts = this.contacts.filter(contacRemove => contacRemove.uuid !== contact.uuid)
            } else {
                return `contact doesn't includes to list contacts`
            }
        })
    }

    changeNameGroup(nameGroup) {
        Validator.isEmptyString(nameGroup);
        return this.name = nameGroup;
    }
}



const contact = new Contact('Piotr', "J", 'p.j@gmail.com')
const contact2 = new Contact('Jarek', 'Michalczewsk', 'JM@interia.pl')
const contact3 = new Contact('Darek', 'fdsfds', 'ewrw@interia.pl')
const contact4 = new Contact('jacenty', 'zbysiu', 'KarolJM@interia.pl')
const contact5 = new Contact('Marek', 'kowal', 'MAW@interia.pl')
const contact6 = new Contact('Mariusz', 'karnia', 'MKA@gmail.pl')


const groupFriends = new GroupContact('znajomi');
const groupFamily = new GroupContact('rodzina');
const groupWork = new GroupContact('praca');

groupFriends.addContacts(contact, contact2, contact3);
groupFamily.addContacts(contact3, contact4);
groupWork.addContacts(contact6, contact5)
groupFriends.remove(contact2)
groupFriends.remove(contact)


const addressBook = new AddressBook();
addressBook.addContacts(contact, contact2, contact3, contact4, contact5, contact6)
addressBook.addContacts(contact, contact2, contact3, contact4, contact5, contact6)
addressBook.addGroups(groupFriends)
addressBook.addGroups(groupFamily)
addressBook.addGroups(groupWork)