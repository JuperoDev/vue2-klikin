<template>
  <button
    class="remove-button"
    @click="$emit('remove')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="remove-button__icon"
    >
      <path d="M3 6h18" />
      <path d="M19 6l-2 14H7L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M5 6L6 4h12l1 2" />
    </svg>
  </button>
</template>

<style scoped>
.remove-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

.remove-button__icon {
  width: 16px;
  height: 16px;
  color: #dc3545;
}
</style>
