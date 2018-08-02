import compact from 'lodash/compact'
export default function pageSplitter(content) {
  return compact(content.split('<h2>')).map(content => `<h2>${content}`)
}
