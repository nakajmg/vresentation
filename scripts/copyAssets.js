const path = require('path')
const getContentsList = require('./mdServer/getContentsList')
const list = getContentsList(path.resolve('./talks'))
const fs = require('fs-extra')
const del = require('del')

async function copyAssets() {
  list.forEach(async ({ slug }) => {
    const from = path.resolve(`./talks/${slug}/assets`)
    const to = path.resolve(`./static/${slug}/assets`)
    if (fs.pathExistsSync(from)) {
      await del(to)
      fs.copySync(from, to)
    }
  })
}

module.exports = copyAssets
