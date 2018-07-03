import { shallowMount } from '@vue/test-utils'
import PagePosition from '../../../src/components/PagePosition.vue'

describe('PagePosition.vue', () => {
  describe('computed', () => {
    it('position', () => {
      const wrapper = shallowMount(PagePosition, {
        propsData: {
          page: 1,
          length: 10,
        },
      })
      expect(wrapper.vm.position).toBe(10)
    })
  })
})
