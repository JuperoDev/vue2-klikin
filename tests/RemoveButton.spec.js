const { shallowMount } = require('@vue/test-utils');
const RemoveButton = require('@/components/RemoveButton.vue').default;

describe('RemoveButton', () => {
  it('emits remove event when clicked', async () => {
    const wrapper = shallowMount(RemoveButton);
    
    await wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted().remove).toBeTruthy();
    expect(wrapper.emitted().remove.length).toBe(1);
  });

  it('renders the SVG icon', () => {
    const wrapper = shallowMount(RemoveButton);
    
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('has the correct CSS classes', () => {
    const wrapper = shallowMount(RemoveButton);
    
    expect(wrapper.classes()).toContain('remove-button');
    expect(wrapper.find('svg').classes()).toContain('remove-button__icon');
  });

  it('renders all SVG paths', () => {
    const wrapper = shallowMount(RemoveButton);
    
    const paths = wrapper.findAll('path');
    expect(paths.length).toBe(5);
  });

  it('has correct SVG attributes', () => {
    const wrapper = shallowMount(RemoveButton);
    
    const svg = wrapper.find('svg');
    expect(svg.attributes('viewBox')).toBe('0 0 24 24');
    expect(svg.attributes('stroke')).toBe('currentColor');
    expect(svg.attributes('stroke-width')).toBe('2');
  });
});