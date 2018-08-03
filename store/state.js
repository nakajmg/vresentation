export default () => {
  return {
    theme: 'Light',
    fontSize: 1,
    themes: ['Light', 'Dark'],
    filter: {
      brightness: 1,
      contrast: 1,
      saturate: 1,
    },
    visibility: {
      settings: false,
    },
    contents: [],
    content: '',
    hasNextPage: null,
    hasPrevPage: null,
    meta: {},
    page: 0,
    pageLength: 0,
    slug: '',
  }
}
