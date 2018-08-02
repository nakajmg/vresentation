const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const del = require('del')
const pdfMerge = require('easy-pdf-merge')
const { createPathsBySlug } = require('./staticPaths')
const createServer = require('./server')
;(async () => {
  const server = await createServer()
  const baseURL = process.env.baseURL
  const slug = process.argv[2]
  const paths = createPathsBySlug({ slug })
  const dirName = `./pdf/temp`
  await new Promise((resolve, reject) => {
    mkdirp(dirName, err => {
      if (err) reject(err)
      else resolve()
    })
  })

  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: true })
  const page = await browser.newPage()

  const fileNames = []
  for (let index = 0; index < paths.length; index++) {
    await page.goto(`${baseURL}${paths[index]}`, {
      waitUntil: 'load',
    })
    const fileName = `${dirName}/${slug}_${index}.pdf`
    await page.pdf({ path: fileName, width: 1280, height: 720, printBackground: true })
    const percentage = ((index / (paths.length - 1)) * 100).toFixed()
    console.log(`${index + 1}/${paths.length} ${percentage}%`)
    fileNames.push(fileName)
  }

  await new Promise((resolve, reject) => {
    const fileName = `./pdf/${slug}.pdf`
    pdfMerge(fileNames, fileName, async err => {
      if (err) {
        console.log(err)
        reject(err)
      }
      console.log('done', fileName)
      resolve()
    })
  })
  await del(dirName)
  await browser.close()
  await server.close()
  process.exit(0)
})()
