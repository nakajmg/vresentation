const compact = require('lodash/compact')
module.exports = function pageSplitter(content) {
  return compact(content.split('<hr>')).map(content => content)
}
