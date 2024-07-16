<template>
  <button
    type="button"
    class="edit-button"
    @click="$emit('edit')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="edit-icon"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
    </svg>
  </button>
</template>
  
  <script>
  export default {
    name: 'EditButton',
  };
  </script>
  
  <style scoped>
  .edit-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
  
  .edit-icon {
    width: 16px;
    height: 16px;
    color: #007bff;
  }
  </style>
  