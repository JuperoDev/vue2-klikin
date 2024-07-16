<template>
    <button
      class="cancel-button"
      @click="$emit('cancel')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="cancel-button__icon"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  </template>
  
  <style scoped>
  .cancel-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
  }
  
  .cancel-button__icon {
    width: 16px;
    height: 16px;
    color: #dc3545;
  }
  </style>
  