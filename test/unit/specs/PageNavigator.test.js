import { shallowMount } from '@vue/test-utils'
import PageNavigator from '../../../components/PageNavigator.vue'
describe('PageNavigator.vue', () => {
  const mockMethods = {
    _bindShortcutKey: () => { },
  }

  describe('methods', () => {
    it('toPrev toNext', () => {
      const wrapper = shallowMount(PageNavigator, {
        methods: mockMethods,
        propsData: {
          page: 1,
          slug: 'test',
          isStartPage: false,
          isEndPage: false,
        },
      })
      wrapper.vm.toNext()
      expect(wrapper.emitted('navigate')[0][0]).toEqual({
        page: 2,
      })
      wrapper.vm.toPrev()
      expect(wrapper.emitted('navigate')[1][0]).toEqual({
        page: 0,
      })
    })
  })
})
