<template functional>
  <button
    class="contact-list__dialog-button"
    @click="props.onClick"
  >
    Add New Contact
  </button>
</template>
  
<script>
export default {
  name: 'AddContactButton',
  functional: true,
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>
  
<style scoped lang="scss">
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

  &:hover {
    background-color: #218838;
  }
}
</style>
