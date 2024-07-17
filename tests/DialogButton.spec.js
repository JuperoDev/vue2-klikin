const { shallowMount } = require('@vue/test-utils');
const DialogButton = require('@/components/DialogButton.vue').default;

describe('DialogButton', () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallowMount(DialogButton, {
      propsData: {
        contacts: []
      },
      stubs: ['FieldAccumulator']
    });
  });

  it('renders the "Add New Contact" button', () => {
    const button = wrapper.find('.contact-list__dialog-button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe('Add New Contact');
  });

  it('opens the dialog when the button is clicked', async () => {
    await wrapper.find('.contact-list__dialog-button').trigger('click');
    expect(wrapper.vm.showDialog).toBe(true);
    expect(wrapper.emitted('open-dialog')).toBeTruthy();
    expect(wrapper.emitted('dialog-opened')).toBeTruthy();
  });

  it('closes the dialog when closeDialog is called', async () => {
    wrapper.vm.showDialog = true;
    await wrapper.vm.closeDialog();
    expect(wrapper.vm.showDialog).toBe(false);
  });

  it('resets the form when closeDialog is called', async () => {
    wrapper.vm.newContact = {
      firstname: 'John',
      lastname: 'Doe',
      email: ['john@example.com'],
      phoneNumber: ['1234567890']
    };
    await wrapper.vm.closeDialog();
    expect(wrapper.vm.newContact).toEqual({
      firstname: '',
      lastname: '',
      email: [''],
      phoneNumber: ['']
    });
  });

  it('emits add-contact event with correct data when form is submitted', async () => {
    wrapper.vm.newContact = {
      firstname: 'John',
      lastname: 'Doe',
      email: ['john@example.com'],
      phoneNumber: ['1234567890']
    };
    await wrapper.vm.saveContact();
    expect(wrapper.emitted('add-contact')).toBeTruthy();
    expect(wrapper.emitted('add-contact')[0][0]).toEqual({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      email: ['john@example.com'],
      phoneNumber: ['1234567890']
    });
  });

  it('closes dialog after saving contact', async () => {
    wrapper.vm.showDialog = true;
    await wrapper.vm.saveContact();
    expect(wrapper.vm.showDialog).toBe(false);
  });
});
