import { shallowMount } from '@vue/test-utils'
import PageJumper from '../../../components/PageJumper'

describe('PageJumper.vue', () => {
  const propsData = {
    page: 1,
    heading: ['hoge', 'fuga'],
  }
  const methods = {
    _bindShortcutKey: () => {},
  }
  it('visibility', () => {
    const wrapper = shallowMount(PageJumper, {
      propsData,
      methods,
    })

    expect(wrapper.attributes().style).toBe('display: none;')
    wrapper.setData({
      visibility: true,
    })
  })

  it('render items', () => {
    const wrapper = shallowMount(PageJumper, {
      propsData,
      methods,
    })
    expect(wrapper.findAll('.PageJumper_Item')).toHaveLength(2)
  })
  it('_cuirrentPageClass', () => {
    const wrapper = shallowMount(PageJumper, {
      propsData,
      methods,
    })
    expect(
      wrapper
        .findAll('.PageJumper_Item')
        .at(0)
        .classes(),
    ).toContain('_currentPage')
  })

  it('navigate', () => {
    const wrapper = shallowMount(PageJumper, {
      propsData,
      methods,
    })
    const item = wrapper.find('.PageJumper_Item')
    item.trigger('click')

    expect(wrapper.emitted('navigate')[0][0]).toEqual({ page: 1 })
  })
})
