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
  // use tor
  //const browser = await puppeteer.launch({args:['--proxy-server=socks5://127.0.0.1:9050']});
  const page = await browser.newPage()
  // page.on('request', request => {
  //   console.log(`Intercepting: ${request.method} ${request.url}`)
  //   request.continue()
  // })

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
  // await page.goto(url, { waitUntil: 'load' })

  //const title = await page.title();
  //console.log(title);
  // await page.screenshot({ path: 'example.png' })
  // const html = await page.content()
  // console.log(html)
  // fs.writeFileSync('./test.html', html)
  await browser.close()
})()
