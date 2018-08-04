const fs = require('fs')

function getContentsList(baseDir) {
  try {
    const list = JSON.parse(fs.readFileSync(`${baseDir}.json`, 'utf-8'))
    return list
  } catch (e) {
    const ret = fs.readdirSync(baseDir)
    const list = ret.map(slug => ({ slug, title: slug }))
    return list
  }
}

module.exports = getContentsList
