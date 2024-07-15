<template>
  <div id="app">
    <ContactList :contacts="contacts" />
    <p
      v-if="error"
      class="error-message"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import ContactList from "@/components/ContactList";
import axios from 'axios';

export default {
  name: "App",
  components: {
    ContactList
  },
  data: () => ({
    contacts: [],
    error: null
  }),
  mounted() {
    this.fetchContacts();
  },
  methods: {
    fetchContacts() {
      axios.get('/contacts.json')
        .then(response => {
          this.contacts = response.data;
        })
        .catch(error => {
          this.error = 'Error fetching contacts: ' + error.message;
        });
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  font-weight: bold;
}
</style>