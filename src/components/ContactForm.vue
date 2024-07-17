<template>
  <form
    class="contact-list__form"
    @submit.prevent="$emit('save')"
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
        @click="$emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
  
  <script>
  import FieldAccumulator from './FieldAccumulator.vue';
  
  export default {
    name: 'ContactForm',
    components: {
      FieldAccumulator
    },
    props: {
      newContact: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
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