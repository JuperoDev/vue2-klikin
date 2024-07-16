<template>
  <div class="contact-list">
    <input
      v-model="searchQuery"
      placeholder="Search contacts"
      class="contact-list__search-input"
      autofocus
    >

    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        class="pagination__button"
        @click="prevPage"
      >
        Previous
      </button>
      <span class="pagination__info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        :disabled="currentPage === totalPages"
        class="pagination__button"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <dialog-button
      :contacts="contacts"
      @open-dialog="showDialog = true"
      @add-contact="addContact"
    />

    <ul class="contact-list__contacts">
      <li
        v-for="contact in paginatedContacts"
        :key="contact.id"
        class="contact-list__contact-item"
      >
        <div class="contact-list__contact-name">
          {{ contact.firstname }} {{ contact.lastname }}
        </div>
        <div class="contact-list__contact-details">
          <div v-if="contact.phoneNumber.length">
            <span class="contact-list__label">Phone:</span>
            {{ contact.phoneNumber.join(', ') }}
          </div>
          <div v-if="contact.email.length">
            <span class="contact-list__label">Email:</span>
            {{ contact.email.join(', ') }}
          </div>
        </div>
        <div class="contact-list__contact-id">
          ID: {{ contact.id }}
        </div>
        <!-- <div class="contact-list__contact-object">
          <pre>{{ contact }}</pre> 
        </div> -->
      </li>
    </ul>
  </div>
</template>


<script>
import DialogButton from './DialogButton.vue';

export default {
  name: "ContactList",
  components: {
    DialogButton
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
      resultsPerPage: 4
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
      // todo: vuex
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
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.contact-list__search-input:focus {
  border-color: #007bff;
  outline: none;
}

.contact-list__contacts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  list-style: none;
  padding: 0;
}

@media (min-width: 768px) {
  .contact-list__contacts {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-list__contact-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  min-height: 150px; /* Set a minimum height for the contact items */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.contact-list__contact-item:hover {
  background-color: #f1f1f1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.contact-list__contact-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.contact-list__contact-details {
  flex-grow: 1;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.contact-list__contact-id {
  font-size: 12px;
  color: grey;
}

.contact-list__contact-object {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 12px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination__button {
  padding: 10px 20px;
  margin: 0 5px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.pagination__button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 16px;
}
</style>


