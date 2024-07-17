<template>
  <div class="field-accumulator">
    <label
      :for="type"
      class="field-accumulator__label"
    >
      {{ label }}
    </label>
    <div
      v-for="(value, index) in localValues"
      :key="index"
      class="field-accumulator__input-group"
    >
      <div
        v-if="editableIndex === index || index === localValues.length - 1"
        class="field-accumulator__input-container"
      >
        <input
          :id="type + index"
          v-model="localValues[index]"
          :type="inputType"
          :placeholder="placeholder"
          class="field-accumulator__input"
          required
          @blur="validateField(index)"
          @keydown.enter="confirmField(index)"
          @keydown.esc="restoreOriginalValue(index)"
        >
        <TickButton
          v-if="index !== localValues.length - 1"
          @confirm="confirmField(index)"
        />
        <CancelButton
          v-if="index !== localValues.length - 1"
          @cancel="restoreOriginalValue(index)"
        />
      </div>
      <div
        v-else
        class="field-accumulator__value-group"
      >
        <span class="field-accumulator__value">{{ value }}</span>
        <EditButton @edit="toggleEdit(index)" />
        <RemoveButton
          v-if="index !== localValues.length - 1 && localValues[index]"
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
      localValues: [...this.values],
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
      const lastValue = this.localValues[this.localValues.length - 1];
      return lastValue && this.isValidField(lastValue);
    }
  },
  watch: {
    values(newValues) {
      this.localValues = [...newValues];
    }
  },
  methods: {
    addField() {
      const lastValue = this.localValues[this.localValues.length - 1];
      if (lastValue && this.isValidField(lastValue)) {
        this.localValues.push('');
        this.editableIndex = this.localValues.length - 1;
        this.$emit('update:values', this.localValues);
      }
    },
    deleteField(index) {
      this.localValues.splice(index, 1);
      if (this.editableIndex === index) {
        this.editableIndex = null;
      }
      this.$emit('update:values', this.localValues);
    },
    toggleEdit(index) {
      if (this.editableIndex !== null) {
        this.validateField(this.editableIndex);
      }
      this.editableIndex = this.editableIndex === index ? null : index;
      if (this.editableIndex !== null) {
        this.originalValue = this.localValues[index]; // Store the original value
      }
    },
    confirmField(index) {
      if (this.localValues[index].trim() === '' || !this.isValidField(this.localValues[index])) {
        this.localValues[index] = this.originalValue; // Restore the original value
      }
      this.editableIndex = null;
      this.$emit('update:values', this.localValues);
    },
    validateField(index) {
      if (this.localValues[index].trim() === '' || !this.isValidField(this.localValues[index])) {
        this.localValues[index] = this.originalValue; // Restore the original value
      }
      this.$emit('update:values', this.localValues);
    },
    restoreOriginalValue(index) {
      this.localValues[index] = this.originalValue; // Restore the original value
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

<style scoped lang="scss">
.field-accumulator {
  margin-bottom: 15px;

  &__label {
    display: block;
    margin-bottom: 5px;
  }

  &__input-group {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  &__input-container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    margin-right: 10px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  &__value-group {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__value {
    width: 100%;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #f9f9f9;
    color: #999;
    margin-right: 10px;
  }

  &__add-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 5px 10px;
    transition: background-color 0.3s;

    &:disabled {
      background-color: #c0c0c0;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: #0056b3;
    }
  }
}
</style>