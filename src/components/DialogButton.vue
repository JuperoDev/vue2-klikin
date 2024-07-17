<template>
  <div>
    <AddContactButton :on-click="openDialog" />
    <ContactDialog
      v-if="showDialog"
      :new-contact="newContact"
      @close="closeDialog"
      @save="saveContact"
    />
  </div>
</template>

<script>
import AddContactButton from './AddContactButton.vue';
import ContactDialog from './ContactDialog.vue';
import contactFormMixin from '../mixins/contactFormMixin';

export default {
  name: 'DialogButton',
  components: {
    AddContactButton,
    ContactDialog
  },
  mixins: [contactFormMixin],
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  methods: {
    openDialog() {
      this.showDialog = true;
      this.$emit('dialog-opened');
    },
    closeDialog() {
      this.showDialog = false;
      this.resetForm();
    },
    saveContact() {
      const contact = {
        ...this.newContact,
        id: this.generateId()
      };
      this.$emit('add-contact', contact);
      this.$emit('new-contact-id', contact.id);
      this.closeDialog();
    },
    generateId() {
      return this.contacts.length + 1;
    }
  }
};
</script>