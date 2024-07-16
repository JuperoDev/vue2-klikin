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
      <div
        v-if="editableIndex === index || index === values.length - 1"
        class="field-accumulator__input-container"
      >
        <input
          :id="type + index"
          v-model="values[index]"
          :type="inputType"
          :placeholder="placeholder"
          class="field-accumulator__input"
          required
          @blur="validateField(index)"
          @keydown.enter="confirmField(index)"
          @keydown.esc="restoreOriginalValue(index)"
        >
        <TickButton v-if="index !== values.length - 1" @confirm="confirmField(index)" />
        <CancelButton v-if="index !== values.length - 1" @cancel="restoreOriginalValue(index)" />
      </div>
      <div
        v-else
        class="field-accumulator__value-group"
      >
        <span class="field-accumulator__value">{{ value }}</span>
        <EditButton @edit="toggleEdit(index)" />
        <RemoveButton
          v-if="index !== values.length - 1 && values[index]"
          @remove="deleteField(index)"
        />
      </div>
    </div>
    <button
      type="button"
      class="field-accumulator__add-button"
      :disabled="!canAddField"
      @click="addField"
    >
      Save and add another {{ label }}
    </button>
  </div>
</template>

<script>
import RemoveButton from './RemoveButton.vue';
import EditButton from './EditButton.vue';
import TickButton from './TickButton.vue';
import CancelButton from './CancelButton.vue';

export default {
  name: 'FieldAccumulator',
  components: {
    RemoveButton,
    EditButton,
    TickButton,
    CancelButton
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
      editableIndex: null,
      originalValue: ''
    };
  },
  computed: {
    label() {
      return this.type === 'email' ? 'Email' : 'Phone Number'; // Updated Label
    },
    inputType() {
      return this.type === 'email' ? 'email' : 'text';
    },
    placeholder() {
      return this.type === 'email' ? 'Enter email' : 'Enter phone number';
    },
    canAddField() {
      const lastValue = this.values[this.values.length - 1];
      return lastValue && this.isValidField(lastValue);
    }
  },
  methods: {
    addField() {
      const lastValue = this.values[this.values.length - 1];
      if (lastValue && this.isValidField(lastValue)) {
        this.values.push('');
        this.editableIndex = this.values.length - 1;
      }
    },
    deleteField(index) {
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
      if (this.editableIndex !== null) {
        this.originalValue = this.values[index]; // Store the original value
      }
    },
    confirmField(index) {
      if (this.values[index].trim() === '' || !this.isValidField(this.values[index])) {
        this.values[index] = this.originalValue; // Restore the original value
      }
      this.editableIndex = null;
    },
    validateField(index) {
      if (this.values[index].trim() === '' || !this.isValidField(this.values[index])) {
        this.values[index] = this.originalValue; // Restore the original value
      }
    },
    restoreOriginalValue(index) {
      this.values[index] = this.originalValue; // Restore the original value
      this.editableIndex = null;
    },
    isValidField(value) {
      if (this.type === 'email') {
        return this.isValidEmail(value);
      }
      // Add phone number validation if needed
      return value.trim() !== '';
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

.field-accumulator__input-container {
  display: flex;
  align-items: center;
  width: 100%;
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

.field-accumulator__add-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
}
</style>
