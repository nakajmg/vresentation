const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const del = require('del')
const pdfMerge = require('easy-pdf-merge')
const { readFileBySlug } = require('./generateStaticPaths')
const baseURL = 'http://localhost:3000'
;(async () => {
  const slug = process.argv[2]
  const paths = readFileBySlug({ slug })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const dirName = `./pdf/temp`
  await new Promise((resolve, reject) => {
    mkdirp(dirName, err => {
      if (err) reject(err)
      else resolve()
    })
  })
  const fileNames = []
  for (let index = 0; index < paths.length; index++) {
    await page.goto(`${baseURL}${paths[index]}`, { waitUntil: 'load' })
    const fileName = `${dirName}/${slug}_${index}.pdf`
    await page.pdf({ path: fileName, width: 1280, height: 720 })
    console.clear()
    const percentage = (index / (paths.length - 1)) * 100
    console.log(`${percentage}% done`)
    fileNames.push(fileName)
  }

  await new Promise((resolve, reject) => {
    const fileName = `./pdf/${slug}.pdf`
    pdfMerge(fileNames, fileName, async err => {
      if (err) {
        console.log(err)
        reject(err)
      }
      console.log('generated:', fileName)
      await del(dirName)
      resolve()
    })
  })
  await browser.close()
})()
