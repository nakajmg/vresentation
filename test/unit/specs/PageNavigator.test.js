import { shallowMount } from '@vue/test-utils'
import PageNavigator from '../../../src/components/PageNavigator.vue'
describe('PageNavigator.vue', () => {
  const mockMethods = {
    _bindShortcutKey: () => {},
  }

  describe('methods', () => {
    it('toPrev toNext', () => {
      const pushStub = jest.fn()
      const replaceStub = jest.fn()
      const wrapper = shallowMount(PageNavigator, {
        methods: mockMethods,
        propsData: {
          page: 1,
          slug: 'test',
          isStartPage: false,
          isEndPage: false,
        },
        mocks: {
          $router: {
            push: pushStub,
            replace: replaceStub,
          },
        },
      })
      wrapper.vm.toNext()
      expect(pushStub).toHaveBeenCalledWith({
        name: 'Slide',
        params: {
          slug: 'test',
          page: 2,
        },
      })
      wrapper.vm.toPrev()
      expect(pushStub).toHaveBeenCalledWith({
        name: 'Slide',
        params: {
          slug: 'test',
          page: 0,
        },
      })
    })
  })
})
