const fs = require('fs-extra')
const path = require('path')
const del = require('del')
const striptags = require('striptags')
const copyAssets = require('./copyAssets')
const parseMarkdown = require('./mdServer/parseMarkdown')
const pageSplitter = require('./mdServer/pageSplitter')
const { heading12, heading34 } = require('./mdServer/markdown/regex')
const baseDir = path.resolve('./talks')
const distDir = path.resolve('./static/api')
const mkdirp = require('mkdirp')

const mkdir = async dirName => {
  await new Promise((resolve, reject) => {
    mkdirp(dirName, err => {
      if (err) reject(err)
      else resolve()
    })
  })
}

function createContentsList() {
  try {
    const list = JSON.parse(fs.readFileSync(`${baseDir}.json`, 'utf-8'))
    return list
  } catch (e) {
    const ret = fs.readdirSync(baseDir)
    const list = ret.map(slug => ({ slug, title: slug }))
    return list
  }
}

function createContents(slug) {
  const markdown = fs.readFileSync(`${baseDir}/${slug}/index.md`, 'utf-8')
  const parsed = parseMarkdown(markdown)
  const pages = pageSplitter(parsed.content)

  for (let page = 0; page <= pages.length; page++) {
    const content = pages[page - 1] || ''
    const json = {
      slug,
      page,
      content,
      meta: parsed.meta,
      pageLength: pages.length,
      hasNextPage: page < pages.length,
      hasPrevPage: page > 0,
    }
    const filePath = `${distDir}/${slug}/${page}.json`
    fs.writeFileSync(filePath, JSON.stringify(json))
  }

  const heading = pages.map(content => {
    let matched = content.match(heading12)
    if (matched && matched[1] !== '') return striptags(matched[1])
    matched = content.match(heading34)
    if (matched && matched[1] !== '') return striptags(matched)[1]
    return 'No Heading'
  })
  fs.writeFileSync(`${distDir}/${slug}/heading.json`, JSON.stringify(heading))
}

;(async () => {
  await mkdirp(distDir)
  const list = createContentsList()
  await copyAssets()
  fs.writeFileSync(`${distDir}/list.json`, JSON.stringify(list))
  await Promise.all(
    list.map(async ({ slug }) => {
      if (fs.pathExistsSync(`${distDir}/${slug}`)) {
        await del(`${distDir}/${slug}`)
      }
      await mkdirp(`${distDir}/${slug}`)
      return createContents(slug)
    }),
  )
  console.log(list)
})()
