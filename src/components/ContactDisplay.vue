<template>
  <ul class="contact-list__contacts">
    <li
      v-for="contact in paginatedContacts"
      :key="contact.id"
      :class="{'highlight': contact.id === lastAddedContactId}" 
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
    </li>
  </ul>
</template>

<script>
export default {
  name: "ContactDisplay",
  props: {
    paginatedContacts: {
      type: Array,
      required: true
    },
    lastAddedContactId: {
      type: [Number, null], // Allow null for the initial state
      default: null
    }
  }
};
</script>

<style scoped lang="scss">
.contact-list {
  &__contacts {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    list-style: none;
    padding: 0;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__contact-item {
    padding: 15px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    min-height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.highlight {
      border: 2px solid #008000;
    }

    &:hover {
      background-color: #f1f1f1;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  &__contact-name {
    font-weight: bold;
    margin-bottom: 10px;
  }

  &__contact-details {
    flex-grow: 1;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  &__contact-id {
    font-size: 12px;
    color: #808080;
  }
}
</style>
