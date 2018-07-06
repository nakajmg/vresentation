import { shallowMount } from '@vue/test-utils'
import ContentPage from '../../../src/components/ContentPage.vue'

describe('ContentPage.vue', () => {
  it('contentが描画されていること', () => {
    const wrapper = shallowMount(ContentPage, {
      context: {
        props: {
          pageContent: '<div>content</div>',
        },
      },
    })
    expect(wrapper.html()).toBe('<div class="ContentPage"><div>content</div></div>')
  })
})
