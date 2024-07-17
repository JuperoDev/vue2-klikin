const { shallowMount } = require('@vue/test-utils');
const FieldAccumulator = require('@/components/FieldAccumulator.vue').default;

describe('FieldAccumulator', () => {
  const createWrapper = (propsData) => {
    return shallowMount(FieldAccumulator, {
      propsData: {
        type: 'email',
        values: [],
        ...propsData
      },
      stubs: ['RemoveButton', 'EditButton', 'TickButton', 'CancelButton']
    });
  };

  it('renders the correct label based on type', () => {
    const emailWrapper = createWrapper({ type: 'email' });
    const phoneWrapper = createWrapper({ type: 'phone' });

    expect(emailWrapper.find('.field-accumulator__label').text()).toBe('Email');
    expect(phoneWrapper.find('.field-accumulator__label').text()).toBe('Phone Number');
  });

  it('renders input fields for each value', async () => {
    const wrapper = createWrapper({ values: ['test@example.com', ''] });
    
    const inputGroups = wrapper.findAll('.field-accumulator__input-group');
    expect(inputGroups.length).toBe(2);
  });

  it('adds a new field when add button is clicked', async () => {
    const wrapper = createWrapper({ values: ['test@example.com'] });
    
    await wrapper.find('.field-accumulator__add-button').trigger('click');
    
    const inputGroups = wrapper.findAll('.field-accumulator__input-group');
    expect(inputGroups.length).toBe(2);
  });

  it('emits update:values event when a field is added', async () => {
    const wrapper = createWrapper({ values: ['test@example.com'] });
    
    await wrapper.find('.field-accumulator__add-button').trigger('click');
    
    expect(wrapper.emitted('update:values')).toBeTruthy();
    expect(wrapper.emitted('update:values')[0][0]).toEqual(['test@example.com', '']);
  });

  it('validates email input', async () => {
    const wrapper = createWrapper({ values: [''] });
    
    const input = wrapper.find('.field-accumulator__input');
    await input.setValue('invalid-email');
    await input.trigger('blur');
    
    expect(wrapper.vm.isValidField('invalid-email')).toBe(false);
    
    await input.setValue('valid@email.com');
    await input.trigger('blur');
    
    expect(wrapper.vm.isValidField('valid@email.com')).toBe(true);
  });

  it('disables add button when last field is empty or invalid', async () => {
    const wrapper = createWrapper({ values: ['test@example.com', ''] });
    
    const addButton = wrapper.find('.field-accumulator__add-button');
    expect(addButton.attributes('disabled')).toBeTruthy();
    
    const inputs = wrapper.findAll('.field-accumulator__input');
    const lastInput = inputs.at(inputs.length - 1);
    
    if (lastInput.exists()) {
      await lastInput.setValue('valid@email.com');
      await lastInput.trigger('blur');
      
      await wrapper.vm.$nextTick();  // Wait for Vue to update the DOM
      
      expect(addButton.attributes('disabled')).toBeFalsy();
    } else {
      console.warn('No input fields were found');
    }
  });

  it('toggles edit mode when edit button is clicked', async () => {
    const wrapper = createWrapper({ values: ['test@example.com'] });
    
    await wrapper.vm.toggleEdit(0);
    
    expect(wrapper.vm.editableIndex).toBe(0);
  });

  it('restores original value when cancel button is clicked', async () => {
    const wrapper = createWrapper({ values: ['test@example.com'] });
    
    wrapper.vm.toggleEdit(0);
    wrapper.vm.localValues[0] = 'new@email.com';
    
    await wrapper.vm.restoreOriginalValue(0);
    
    expect(wrapper.vm.localValues[0]).toBe('test@example.com');
  });

  it('removes a field when remove button is clicked', async () => {
    const wrapper = createWrapper({ values: ['test1@example.com', 'test2@example.com'] });
    
    await wrapper.vm.deleteField(0);
    
    expect(wrapper.vm.localValues.length).toBe(1);
    expect(wrapper.vm.localValues[0]).toBe('test2@example.com');
    expect(wrapper.emitted('update:values')[0][0]).toEqual(['test2@example.com']);
  });
});