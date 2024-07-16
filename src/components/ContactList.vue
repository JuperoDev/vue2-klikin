<template>
  <div class="contact-list">
    <input
      v-model="searchQuery"
      placeholder="Search contacts"
      class="contact-list__search-input"
      autofocus
    >

    <ContactPagination
      v-if="filteredContacts.length > 0"
      :current-page="currentPage"
      :total-pages="totalPages"
      @prevPage="prevPage"
      @nextPage="nextPage"
    />

    <div
      v-else
      class="no-results"
    >
      No results
    </div>

    <DialogButton
      :contacts="contacts"
      @open-dialog="showDialog = true"
      @add-contact="addContact"
      @new-contact-id="setNewContactPage"
      @dialog-opened="resetSearch"
    />

    <ContactDisplay 
      :paginated-contacts="paginatedContacts" 
      :last-added-contact-id="lastAddedContactId"  
    />
  </div>
</template>

<script>
import DialogButton from './DialogButton.vue';
import ContactDisplay from './ContactDisplay.vue';
import ContactPagination from './ContactPagination.vue';

export default {
  name: "ContactList",
  components: {
    DialogButton,
    ContactDisplay,
    ContactPagination
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchQuery: '',
      showDialog: false,
      currentPage: 1,
      resultsPerPage: 4,
      lastAddedContactId: null  // Track the last added contact ID
    };
  },
  computed: {
    filteredContacts() {
      const query = this.searchQuery.toLowerCase();
      return this.contacts
        .filter(contact => 
          contact.firstname.toLowerCase().includes(query) ||
          contact.lastname.toLowerCase().includes(query) ||
          contact.email.some(email => email.toLowerCase().includes(query)) ||
          contact.phoneNumber.some(phone => phone.includes(query))
        )
        .sort((a, b) => a.lastname.localeCompare(b.lastname));
    },
    paginatedContacts() {
      const start = (this.currentPage - 1) * this.resultsPerPage;
      const end = start + this.resultsPerPage;
      return this.filteredContacts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredContacts.length / this.resultsPerPage);
    }
  },
  methods: {

    
    addContact(newContact) {
      this.contacts.push(newContact);
      this.setNewContactPage(newContact.id);  // Set the page for the new contact
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    setNewContactPage(contactId) {
      const index = this.filteredContacts.findIndex(contact => contact.id === contactId);
      this.currentPage = Math.floor(index / this.resultsPerPage) + 1;
      this.lastAddedContactId = contactId;  // Set the last added contact ID
    },

    resetSearch() {
      this.searchQuery = '';
      this.currentPage = 1; // Reset to first page
    }
  }
};
</script>

<style scoped>
.contact-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-list__search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.contact-list__search-input:focus {
  border-color: #007bff;
  outline: none;
}

.no-results {
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 20px;
}
</style>
