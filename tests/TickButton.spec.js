// tests/TickButton.spec.js
const { shallowMount } = require('@vue/test-utils');
const TickButton = require('@/components/TickButton.vue').default;

describe('TickButton', () => {
  it('emits confirm event when clicked', async () => {
    const wrapper = shallowMount(TickButton)
    
    await wrapper.find('button').trigger('click')
    
    expect(wrapper.emitted().confirm).toBeTruthy()
    expect(wrapper.emitted().confirm.length).toBe(1)
  })

  it('renders the SVG icon', () => {
    const wrapper = shallowMount(TickButton)
    
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('has the correct CSS classes', () => {
    const wrapper = shallowMount(TickButton)
    
    expect(wrapper.classes()).toContain('tick-button')
    expect(wrapper.find('svg').classes()).toContain('tick-button__icon')
  })
})