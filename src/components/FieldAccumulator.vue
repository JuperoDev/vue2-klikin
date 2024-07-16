<template>
  <div class="field-accumulator">
    <label
      :for="type"
      class="field-accumulator__label"
    >
      {{ label }}
    </label>
    <div
      v-for="(value, index) in values"
      :key="index"
      class="field-accumulator__input-group"
    >
      <input
        v-if="editableIndex === index || index === values.length - 1"
        :id="type + index"
        v-model="values[index]"
        :type="inputType"
        :placeholder="placeholder"
        class="field-accumulator__input"
        required
        @blur="validateField(index)"
        @keydown.enter="confirmField(index)"
      >
      <div
        v-else
        class="field-accumulator__value-group"
      >
        <span class="field-accumulator__value">{{ value }}</span>
        <button
          type="button"
          class="field-accumulator__edit-button"
          @click="toggleEdit(index)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="field-accumulator__edit-icon"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z" />
          </svg>
        </button>
      </div>
      <remove-button
        v-if="index !== values.length - 1"
        @remove="removeField(index)"
      />
    </div>
    <button
      type="button"
      class="field-accumulator__add-button"
      @click="addField"
    >
      Add another {{ label }}
    </button>
  </div>
</template>

<script>
import RemoveButton from './RemoveButton.vue';

export default {
  name: 'FieldAccumulator',
  components: {
    RemoveButton
  },
  props: {
    type: {
      type: String,
      required: true
    },
    values: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editableIndex: 0
    };
  },
  computed: {
    label() {
      return this.type === 'email' ? 'Email' : 'Phone Number';
    },
    inputType() {
      return this.type === 'email' ? 'email' : 'text';
    },
    placeholder() {
      return this.type === 'email' ? 'Enter email' : 'Enter phone number';
    }
  },
  methods: {
    addField() {
      this.values.push('');
      this.editableIndex = this.values.length - 1;
    },
    removeField(index) {
      this.values.splice(index, 1);
      if (this.editableIndex === index) {
        this.editableIndex = null;
      }
    },
    toggleEdit(index) {
      if (this.editableIndex !== null) {
        this.validateField(this.editableIndex);
      }
      this.editableIndex = this.editableIndex === index ? null : index;
    },
    confirmField(index) {
      if (this.type === 'email' && !this.isValidEmail(this.values[index])) {
        alert('Please enter a valid email address.');
        this.values[index] = '';
        this.editableIndex = index;
      } else {
        this.editableIndex = null;
      }
    },
    validateField(index) {
      if (this.type === 'email' && !this.isValidEmail(this.values[index])) {
        alert('Please enter a valid email address.');
        this.values[index] = '';
      }
    },
    isValidEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }
  }
};
</script>

<style scoped>
.field-accumulator {
  margin-bottom: 15px;
}

.field-accumulator__label {
  display: block;
  margin-bottom: 5px;
}

.field-accumulator__input-group {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.field-accumulator__input {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  margin-right: 10px;
}

.field-accumulator__value-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.field-accumulator__value {
  width: 100%;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #f9f9f9;
  color: #999;
  margin-right: 10px;
}

.field-accumulator__edit-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.field-accumulator__edit-icon {
  width: 16px;
  height: 16px;
  color: #007bff;
}

.field-accumulator__add-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
}
</style>
