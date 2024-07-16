<template>
  <div>
    <button
      class="contact-list__dialog-button"
      @click="openDialog"
    >
      Add New Contact
    </button>

    <div
      v-if="showDialog"
      class="contact-list__dialog-overlay"
      @click="closeDialog"
    >
      <div
        class="contact-list__dialog"
        @click.stop
      >
        <h2 class="contact-list__dialog-title">
          Add New Contact
        </h2>
        <form
          class="contact-list__form"
          @submit.prevent="saveContact"
        >
          <div class="contact-list__form-group">
            <label
              for="firstname"
              class="contact-list__label"
            >First Name:</label>
            <input
              id="firstname"
              v-model="newContact.firstname"
              class="contact-list__input"
              required
            >
          </div>
          <div class="contact-list__form-group">
            <label
              for="lastname"
              class="contact-list__label"
            >Last Name:</label>
            <input
              id="lastname"
              v-model="newContact.lastname"
              class="contact-list__input"
              required
            >
          </div>
          <div class="contact-list__form-group">
            <FieldAccumulator
              type="email"
              :values="newContact.email"
            />
          </div>
          <div class="contact-list__form-group">
            <FieldAccumulator
              type="phone"
              :values="newContact.phoneNumber"
            />
          </div>
          <div class="contact-list__button-group">
            <button
              type="submit"
              class="contact-list__save-button"
            >
              Save
            </button>
            <button
              type="button"
              class="contact-list__cancel-button"
              @click="closeDialog"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import FieldAccumulator from './FieldAccumulator.vue';

export default {
  name: 'DialogButton',
  components: {
    FieldAccumulator
  },
  props: {
    contacts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showDialog: false,
      newContact: {
        firstname: '',
        lastname: '',
        email: [''],
        phoneNumber: ['']
      }
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.resetForm();
    },
    resetForm() {
      this.newContact = {
        firstname: '',
        lastname: '',
        email: [''],
        phoneNumber: ['']
      };
    },
    saveContact() {
      const contact = {
        ...this.newContact,
        id: this.generateId()
      };
      this.$emit('add-contact', contact);
      this.$emit('new-contact-id', contact.id);  // Emit new contact ID
      this.closeDialog();
    },
    generateId() {
      return this.contacts.length + 1;
    }
  }
};
</script>


<style scoped>
.contact-list__dialog-button {
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.contact-list__dialog-button:hover {
  background-color: #218838;
}

.contact-list__dialog-overlay {
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

.contact-list__dialog {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1001;
}

.contact-list__dialog-title {
  margin-bottom: 20px;
}

.contact-list__form {
  display: flex;
  flex-direction: column;
}

.contact-list__form-group {
  margin-bottom: 15px;
}

.contact-list__label {
  display: block;
  margin-bottom: 5px;
}

.contact-list__input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.contact-list__button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.contact-list__save-button, .contact-list__cancel-button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.contact-list__save-button {
  background-color: #28a745;
  color: white;
}

.contact-list__cancel-button {
  background-color: #dc3545;
  color: white;
}
</style>
