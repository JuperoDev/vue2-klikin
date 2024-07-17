<template>
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
        v-model="localContact.firstname"
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
        v-model="localContact.lastname"
        class="contact-list__input"
        required
      >
    </div>
    <div class="contact-list__form-group">
      <FieldAccumulator
        type="email"
        :values="localContact.email"
        @update:values="updateEmails"
      />
    </div>
    <div class="contact-list__form-group">
      <FieldAccumulator
        type="phone"
        :values="localContact.phoneNumber"
        @update:values="updatePhoneNumbers"
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
  },
  data() {
    return {
      localContact: { ...this.newContact }
    };
  },
  methods: {
    updateEmails(updatedEmails) {
      this.localContact.email = updatedEmails;
    },
    updatePhoneNumbers(updatedPhoneNumbers) {
      this.localContact.phoneNumber = updatedPhoneNumbers;
    },
    saveContact() {
      this.$emit('save', this.localContact);
    }
  }
};
</script>

<style scoped lang="scss">
.contact-list {
  &__form {
    display: flex;
    flex-direction: column;
  }

  &__form-group {
    margin-bottom: 15px;
  }

  &__label {
    display: block;
    margin-bottom: 5px;
  }

  &__input {
    width: 100%;
    padding: 5px;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }

  &__button-group {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  &__save-button,
  &__cancel-button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  &__save-button {
    background-color: #28a745;
    color: #ffffff;
  }

  &__cancel-button {
    background-color: #dc3545;
    color: #ffffff;
  }
}
</style>
