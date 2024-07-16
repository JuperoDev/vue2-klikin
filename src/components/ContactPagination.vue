<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      class="pagination__button"
      @click="$emit('prevPage')"
    >
      Previous
    </button>
    <span class="pagination__info">
      Page {{ currentPage }} of {{ totalPages }}
    </span>
    <button
      :disabled="currentPage === totalPages"
      class="pagination__button"
      @click="$emit('nextPage')"
    >
      Next
    </button>
  </div>
</template>
  
  <script>
  export default {
    name: "ContactPagination",
    props: {
      currentPage: {
        type: Number,
        required: true
      },
      totalPages: {
        type: Number,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0 20px;
  }
  
  .pagination__button {
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }
  
  .pagination__button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  
  .pagination__info {
    font-size: 16px;
  }
  </style>
  