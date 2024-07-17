// tests/EditButton.spec.js
const { shallowMount } = require('@vue/test-utils');
const EditButton = require('@/components/EditButton.vue').default;

describe('EditButton', () => {
  it('emits edit event when clicked', async () => {
    const wrapper = shallowMount(EditButton)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted().edit).toBeTruthy()
    expect(wrapper.emitted().edit.length).toBe(1)
  })

  it('renders the SVG icon', () => {
    const wrapper = shallowMount(EditButton)
    
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has the correct CSS classes', () => {
    const wrapper = shallowMount(EditButton)
    
    expect(wrapper.classes()).toContain('edit-button')
    expect(wrapper.find('svg').classes()).toContain('edit-icon')
  })

  it('renders the correct SVG paths', () => {
    const wrapper = shallowMount(EditButton)
    
    const paths = wrapper.findAll('path')
    expect(paths.length).toBe(2)
    expect(paths.at(0).attributes('d')).toBe('M12 20h9')
    expect(paths.at(1).attributes('d')).toBe('M16.5 3.5l4 4L7 21H3v-4L16.5 3.5z')
  })
})