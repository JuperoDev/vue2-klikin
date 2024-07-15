<template>
  <div class="contact-list">
    <input
      v-model="searchQuery"
      placeholder="Search contacts"
      class="search-input"
      autofocus
    >

    <dialog-button @open-dialog="showDialog = true" @add-contact="addContact" />

    <ul class="contacts">
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="contact-item"
      >
        <div class="contact-name">
          {{ contact.firstname }} {{ contact.lastname }}
        </div>
        <ul class="contact-details">
          <li
            v-for="(phone, index) in contact.phoneNumber"
            :key="'phone'+index"
            class="contact-detail"
          >
            <span class="label">Phone:</span> {{ phone }}
          </li>
          <li
            v-for="(email, index) in contact.email"
            :key="'email'+index"
            class="contact-detail"
          >
            <span class="label">Email:</span> {{ email }}
          </li>
        </ul>
      </li>
    </ul>

    <div
      v-if="showDialog"
      class="dialog-overlay"
      @click="showDialog = false"
    >
      <div
        class="dialog"
        @click.stop
      >
        <p>Hello World</p>
        <button
          class="close-button"
          @click="showDialog = false"
        >
          Close
        </button>
      </div>
    </div>
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
      showDialog: false
    };
  },
  methods: {
    addContact(newContact) {
      this.contacts.push(newContact);
      // todo: vuex
    }
  }
,
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

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

.contacts {
  list-style: none;
  padding: 0;
}

.contact-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.contact-item:hover {
  background-color: #f1f1f1;
}

.contact-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.contact-details {
  list-style: none;
  padding: 0;
}

.contact-detail {
  padding: 5px 0;
  font-size: 14px;
}

.label {
  font-weight: bold;
  margin-right: 5px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3;
}
</style>