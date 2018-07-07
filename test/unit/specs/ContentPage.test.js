import { shallowMount } from '@vue/test-utils'
import ContentPage from '../../../src/components/ContentPage.vue'

describe('ContentPage.vue', () => {
  it('contentが描画されていること', () => {
    const wrapper = shallowMount(ContentPage, {
      context: {
        props: {
          pageContent: '<div>content</div>',
          theme: 'Light',
        },
      },
    })
    expect(wrapper.html()).toBe('<div class="ContentPage Theme_Light"><div>content</div></div>')
  })
})
