let contacts = [];


/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */
function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    number: form.number.value,
    emergency: form.emergency.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
}

/**.
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactList = JSON.parse(window.localStorage.getItem("contacts"))
  if (contactList){
    contacts = contactList
  }
}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let contactListElement = document.getElementById("contact-list")
  let contactsTemplate = ""
  contacts.forEach(contact => {
    contactsTemplate += `
    <div class="contact-card ${contact.emergency ? 'emergency-contact' : ''}">
        <h3>${contact.name}</h3>
        <p>${contact.number}</p>
        <button type="button" onclick="removeContact('${contact.id}')">remove</button>
      </div>
      `
    })
    contactListElement.innerHTML = contactsTemplate
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contact.id)
  if (index == -1){
    throw new Error("Invalid Contact ID")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**!!!!!
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {
  let toggle = document.getElementById("new-contact-form")
    toggle.classList.toggle("hidden")

}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()
