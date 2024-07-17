<template>
  <div
    class="contact-list__dialog-overlay"
    @click="$emit('close')"
  >
    <div
      class="contact-list__dialog"
      @click.stop
    >
      <h2 class="contact-list__dialog-title">
        Add New Contact
      </h2>
      <ContactForm
        :new-contact="newContact"
        @save="$emit('save')"
        @cancel="$emit('close')"
      />
    </div>
  </div>
</template>
  
  <script>
  import ContactForm from './ContactForm.vue';
  
  export default {
    name: 'ContactDialog',
    components: {
      ContactForm
    },
    props: {
      newContact: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped lang="scss">
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
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    z-index: 1001;
  }
  
  .contact-list__dialog-title {
    margin-bottom: 20px;
  }
  </style>
  