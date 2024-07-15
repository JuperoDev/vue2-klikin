<template>
    <button @click="$emit('open-dialog')" class="dialog-button">Open Dialog</button>
  </template>
  
  <script>
  export default {
    name: 'DialogButton'
  }
  </script>
  
  <style scoped>
  .dialog-button {
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
  
  .dialog-button:hover {
    background-color: #218838;
  }
  </style>