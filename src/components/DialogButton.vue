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
      class="dialog-overlay"
      @click="closeDialog"
    >
      <div
        class="dialog"
        @click.stop
      >
        <h2>Add New Contact</h2>
        <form @submit.prevent="saveContact">
          <div class="form-group">
            <label for="firstname">First Name:</label>
            <input
              id="firstname"
              v-model="newContact.firstname"
              required
            >
          </div>
          <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input
              id="lastname"
              v-model="newContact.lastname"
              required
            >
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input
              id="email"
              v-model="newContact.email"
              type="email"
              required
            >
          </div>
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input
              id="phone"
              v-model="newContact.phoneNumber"
              required
            >
          </div>
          <div class="button-group">
            <button
              type="submit"
              class="save-button"
            >
              Save
            </button>
            <button
              type="button"
              class="cancel-button"
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
export default {
  name: 'DialogButton',
  data() {
    return {
      showDialog: false,
      newContact: {
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: ''
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
        email: '',
        phoneNumber: ''
      };
    },
    saveContact() {
      const contact = {
        ...this.newContact,
        id: this.generateId(),
        email: [this.newContact.email],
        phoneNumber: [this.newContact.phoneNumber]
      };
      this.$emit('add-contact', contact);
      this.closeDialog();
    },
    generateId() {
      // You should implement a more robust ID generation method
      return Date.now();
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
  width: 300px;
  z-index: 1001;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button, .cancel-button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.save-button {
  background-color: #28a745;
  color: white;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
}
</style>
