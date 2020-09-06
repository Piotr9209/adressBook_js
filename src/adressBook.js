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

// książka adresowa 
// Ma mieć: listę wszystkich kontaktów, listę grup kontaktów.
// Ma umożliwiać: można szukać kontaktu po frazie, można dodać kontakt do grupy
class AddressBook {
    constructor() {
        this.listOfContacts = [];
        this.listOfGroups = []; //with contact
        this.listOfContactsInGroups = [];
    }

    hasContactAlreadyExist(contact) {
        //sprawdz czy kontakt juz istnieje
    }
    hasGroupAlreadyExist(group) {
        //sprawdz czy grupa istnieje
    }

    //nazwa args arrayOfContacts
    addContacts(...objContact) {
        objContact.forEach(elContact => {
            if (!Validator.isContact(elContact)) throw new Error(`contact doesn't includes to class Contact`);
            this.listOfContacts.push(elContact);
        })
    }

    //nigdy nie dodajemy wielu grup - zawsze dodajemy jedna grupe
    addGroups(...objGroupContact) {
        objGroupContact.forEach(elGroup => {
            if (!Validator.isGroupContact(elGroup)) throw new Error(`group contact doesn't includes to class Group Contact`)
            this.listOfGroups.push(elGroup);
        })
    }

    addContactsToGroup(objGroupName, [...objContact]) {
        if (!Validator.isGroupContact(objGroupName)) return false;
        const currentGroupName = this.listOfContactsInGroups.find(el => el.group.uuid === objGroupName.uuid)
        if (typeof currentGroupName === 'undefined') {
            this.listOfContactsInGroups.push({
                'group': objGroupName,
                'contacts': objContact.filter(el => el instanceof Contact)
            })
        } else {
            objContact.forEach(el => {
                if (!currentGroupName.contacts.find(elFind => elFind.uuid === el.uuid) && el instanceof Contact) {
                    currentGroupName.contacts.push(el);
                }
            })
        }
    }

    removeContactFromGroup(...objContact) {
        console.log("listOfGroupInCon=>", this.listOfContactsInGroups)
        objContact.forEach(contact => {
            this.listOfContactsInGroups.contacts = this.listOfContactsInGroups.map(el => el.contacts.filter(element => element.uuid !== contact.uuid))
        })
        // const res = this.listOfContactsInGroups.map(el => el.contacts.filter(element => element.uuid !== objContact.uuid))
        console.log("listOfGroupInCon po filter=>", this.listOfContactsInGroups)
        // console.log("const res=>", res)
    }


    removeContact(...objContact) {
        objContact.forEach(elContact => {
            if (!Validator.isContact(elContact) && !this.listOfContacts.find(elFin => elFin.uuid === elContact.uuid)) {
                return false
            } else {
                this.listOfContacts = this.listOfContacts.filter(ele => ele.uuid !== elContact.uuid)
            }
        })
    }



    //tu korzystam z listy group ktore juz dodalem 

    searchContactFromPhrase(phrase) {
        return this.listOfContacts.filter(contact => {
            if (phrase.length < 0 && typeof phrase !== "string") {
                return `args not found`
            }
            return contact.name.toLowerCase().includes(phrase.toLowerCase()) || contact.surname.toLowerCase().includes(phrase.toLowerCase()) || contact.email.toLowerCase().includes(phrase.toLowerCase());
        })
    }
}

//     Obiekt charakteryzujący pojedyńczy kontak:
//     Ma mieć: Imie, Nazwisko, adres - emial, datę modyfikacji / utworzenia, uuid
// Ma umożliwiać: aktualizację datę modyfikacji, wyświetlać
// w odpowiednim formacie przy wywołaniu, pozwalac na modyfikację imienia, nazwiska oraz adresu email

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
// Obiekt charakteryzujący grupę kontaktów:
//     Ma mieć: listę kontaktów
// Ma umożliwiać: Można zmienić nazwę grupy, można dodać lub usunac kontakt z grupy "

class GroupContact {
    constructor(nameGroup) {
        Validator.isEmptyString(nameGroup);
        this.uuid = uuidv4();
        this.name = nameGroup;
        // this.contacts = [] //wrzucam kontakty które przypisuje do grupy];
    }
    // TO REMOVE:
    // addToGroup(...objContact) {
    //     objContact.forEach(el => {
    //         if (!Validator.isContact(el)) throw new Error(`obj contact doesnt't instance of class Contact`);
    //         this.contactsInGroup.push(el);
    //     })
    // }




    isContactInGroup(contactToCheck) {
        // sprawdzenie czy kontakt istnieje
    }

    addContacts(contact) {
        //  validacja
        //this.isContactInGroup()
        //push kontakt
    }

    remove(contact) {
        // validacja
        //this.isContactInGroup(contact)
        //filter !== contact.uuid
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
const contact5 = new Contact('rodzinaName', 'zbysiu', 'KarolJM@interia.pl')
const contact6 = new Contact('kuzyniName', 'zbysiu', 'KarolJM@interia.pl')

const groupFriends = new GroupContact('znajomi');
const groupFamily = new GroupContact('rodzina');
const groupFamily2 = new GroupContact('rodzina2');

const adressBook = new AddressBook();
adressBook.addContacts(contact, contact2, contact3, contact4, contact5, contact6);
adressBook.addGroups(groupFriends);
adressBook.addContactsToGroup(groupFriends, [contact]);
adressBook.addContactsToGroup(groupFriends, [contact2, contact3]);

adressBook.addContactsToGroup(groupFamily, [contact5, contact4, contact3])
adressBook.addContactsToGroup(groupFamily2, [contact5])
adressBook.removeContactFromGroup(contact5, contact3)
console.log(adressBook);