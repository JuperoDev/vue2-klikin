<template>
  <button
    class="tick-button"
    @click="$emit('confirm')"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="tick-button__icon"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  </button>
</template>
  
<style scoped lang="scss">
.tick-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;

  &__icon {
    width: 16px;
    height: 16px;
    color: #28a745;
  }
}
</style>
