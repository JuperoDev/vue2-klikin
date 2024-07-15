<template>
  <div class="contact-list">
    <input
      v-model="searchQuery"
      placeholder="Search contacts"
      class="contact-list__search-input"
      autofocus
    >

    <dialog-button
      :contacts="contacts"
      @open-dialog="showDialog = true"
      @add-contact="addContact"
    />

    <ul class="contact-list__contacts">
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="contact-list__contact-item"
      >
        <div class="contact-list__contact-name">
          {{ contact.firstname }} {{ contact.lastname }}
        </div>
        <ul class="contact-list__contact-details">
          <li
            v-for="(phone, index) in contact.phoneNumber"
            :key="'phone'+index"
            class="contact-list__contact-detail"
          >
            <span class="contact-list__label">Phone:</span> {{ phone }}
          </li>
          <li
            v-for="(email, index) in contact.email"
            :key="'email'+index"
            class="contact-list__contact-detail"
          >
            <span class="contact-list__label">Email:</span> {{ email }}
          </li>
        </ul>
        <!-- <div class="contact-list__contact-id">ID: {{ contact.id }}</div> this is just to show we have generated the id -->
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
      showDialog: false
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
    }
  },
  methods: {
    addContact(newContact) {
      this.contacts.push(newContact);
      // todo: vuex
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
  list-style: none;
  padding: 0;
}

.contact-list__contact-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s ease;
}

.contact-list__contact-item:hover {
  background-color: #f1f1f1;
}

.contact-list__contact-name {
  font-weight: bold;
  margin-bottom: 10px;
}

.contact-list__contact-details {
  list-style: none;
  padding: 0;
}

.contact-list__contact-detail {
  padding: 5px 0;
  font-size: 14px;
}

.contact-list__label {
  font-weight: bold;
  margin-right: 5px;
}

.contact-list__contact-id {
  font-size: 12px;
  color: grey;
  margin-top: 10px;
}
</style>
