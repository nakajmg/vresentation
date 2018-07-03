import { shallowMount } from '@vue/test-utils'
import TitlePage from '../../../src/components/TitlePage.vue'

describe('TitlePage.vue', () => {
  it('propsが受け取れてる', () => {
    const wrapper = shallowMount(TitlePage, {
      propsData: {
        meta: {
          title: 'test title',
          author: 'test author',
          location: 'test location',
          date: 'test date',
        },
      },
    })
    expect(wrapper.find('h1').text()).toBe('test title')
    expect(wrapper.vm.$props.meta).toEqual({
      title: 'test title',
      author: 'test author',
      location: 'test location',
      date: 'test date',
    })
  })
})
