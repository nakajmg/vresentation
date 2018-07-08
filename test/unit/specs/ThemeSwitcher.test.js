import { shallowMount } from '@vue/test-utils'
import ThemeSwitcher from '../../../src/components/ThemeSwitcher'

describe('ThemeSwitcher.vue', () => {
  const propsData = {
    themes: ['Light', 'Dark'],
  }

  it('render items', () => {
    const wrapper = shallowMount(ThemeSwitcher, {
      propsData,
    })
    expect(wrapper.findAll('.ThemeSwitcher_Button')).toHaveLength(2)
  })

  it('select', () => {
    const wrapper = shallowMount(ThemeSwitcher, {
      propsData,
    })
    const item = wrapper.find('.ThemeSwitcher_Button')
    item.trigger('click')

    expect(wrapper.emitted('select')[0][0]).toEqual({ theme: 'Light' })
  })
})
