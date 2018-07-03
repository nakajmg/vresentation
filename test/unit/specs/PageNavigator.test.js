import { shallowMount, mount } from '@vue/test-utils'
import PageNavigator from '../../../src/components/PageNavigator.vue'
describe('PageNavigator.vue', () => {
  const $route = {
    params: {
      slug: 'test',
      page: '1',
    },
  }
  const $router = {
    push: () => {},
    replace: () => {},
  }
  const mockMethods = {
    _bindShortcutKey: () => {},
    _startWatch: () => {},
  }
  describe('computed', () => {
    let wrapper
    beforeEach(() => {
      wrapper = shallowMount(PageNavigator, {
        methods: mockMethods,
        propsData: {
          page: 1,
          length: 10,
        },
        mocks: {
          $route,
          $router,
        },
      })
    })
    it('slug', () => {
      expect(wrapper.vm.slug).toBe('test')
    })
    it('isEndPage', () => {
      expect(wrapper.vm.isEndPage).toBe(false)
      wrapper.setProps({
        page: 2,
        length: 2,
      })
      expect(wrapper.vm.isEndPage).toBe(true)
    })
    it('isEndPage', async () => {
      wrapper.setProps({
        page: 0,
        length: 1,
      })
      expect(wrapper.vm.isStartPage).toBe(true)
      wrapper.setProps({
        page: 1,
        length: 1,
      })
      expect(wrapper.vm.isStartPage).toBe(false)
    })
  })
  describe('methods', () => {
    it('prev next replaceToTop', () => {
      const pushStub = jest.fn()
      const replaceStub = jest.fn()
      const wrapper = shallowMount(PageNavigator, {
        methods: mockMethods,
        propsData: {
          page: 1,
          length: 10,
        },
        mocks: {
          $route,
          $router: {
            push: pushStub,
            replace: replaceStub,
          },
        },
      })
      wrapper.vm.next()
      expect(pushStub).toHaveBeenCalledWith({
        name: 'Slide',
        params: {
          slug: 'test',
          page: 2,
        },
      })
      wrapper.vm.prev()
      expect(pushStub).toHaveBeenCalledWith({
        name: 'Slide',
        params: {
          slug: 'test',
          page: 0,
        },
      })
      wrapper.vm.replaceToTop()
      expect(replaceStub).toHaveBeenCalled()
    })
  })
})
