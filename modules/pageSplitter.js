import compact from 'lodash/compact'
export default function pageSplitter(content) {
  return compact(content.split('<hr>')).map(content => content)
}
