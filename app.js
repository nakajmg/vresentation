const fs = require('fs')
const frontmatter = require('frontmatter');
const file = fs.readFileSync('./src/talks/jsx/index.md', 'utf-8')
const parsed = frontmatter(file)
const MarkdownIt = require('markdown-it'), md = new MarkdownIt();
const contetns = md.render(parsed.content).split('<hr>').reduce(content => content)

console.log(contetns)
