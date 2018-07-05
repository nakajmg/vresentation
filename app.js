const fs = require('fs')
const frontmatter = require('frontmatter')
const file = fs.readFileSync('./static/talks/jsx/index.md', 'utf-8')
const parsed = frontmatter(file)
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt()
const contents = md.render(parsed.content).split('\n<h2>')
// console.log(md.render(parsed.content))
console.log(contents)
