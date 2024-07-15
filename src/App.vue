<template>
  <div id="app">
    <ContactList :contacts="contacts" />
  </div>
</template>

<script>
import ContactList from "@/components/ContactList";
import contacts from '@/assets/contacts.json';

export default {
  name: "App",
  components: {
    ContactList
  },
  data: () => ({
    contacts: contacts
  })
};
</script>

<style>

</style>