const compact = require('lodash/compact')
module.exports = function pageSplitter(content) {
  return compact(content.split('<h2>')).map(content => `<h2>${content}`)
}
