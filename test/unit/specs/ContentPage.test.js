import { shallowMount } from '@vue/test-utils'
import ContentPage from '../../../src/components/ContentPage.vue'

describe('ContentPage.vue', () => {
  it('contentが描画されていること', () => {
    const wrapper = shallowMount(ContentPage, {
      context: {
        props: {
          content: '<div>content</div>',
        },
      },
    })
    console.log(wrapper.text())
    expect(wrapper.html()).toBe('<div class="ContentPage"><div>content</div></div>')
  })
})
