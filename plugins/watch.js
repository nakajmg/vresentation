import types from '../store/types'
export default ({ store }) => {
  if (process.browser && !process.static) {
    return store.dispatch(types.WATCH_MARKDOWN)
  }
}
