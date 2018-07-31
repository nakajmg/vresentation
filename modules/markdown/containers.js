import container from 'markdown-it-container'

export default md => {
  md.use(...createContainer('center', ''))
    .use(...createContainer('left', ''))
    .use(...createContainer('right', ''))
    .use(...createBgImageContainer('bg'))
    .use(...createBgImageContainer('cover'))
    .use(...createVideoContainer('video'))
}

function createContainer(klass, defaultTitle) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info
          .trim()
          .slice(klass.length)
          .trim()
        if (token.nesting === 1) {
          return `<div class="${klass} custom-block">\n`
        } else {
          return `</div>\n`
        }
      },
    },
  ]
}

function createBgImageContainer(klass) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const [klassName, path, filter] = token.info.trim().split(' ')
        if (token.nesting === 1) {
          return `<div class="${klassName} custom-block"><div class="background" style="${
            path ? 'background-image: url(' + path + ');' : ''
            } ${filter ? 'filter:' + filter + ';' : ''}"></div><div class="foreground">\n`
        } else {
          return `</div></div>\n`
        }
      },
    },
  ]
}

function createVideoContainer(klass) {
  return [
    container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const [klassName, videoPath] = token.info.trim().split(' ')
        if (token.nesting === 1) {
          let html = `<div class="${klassName} custom-block">`
          html += videoPath ? `<video src="${videoPath}" controls preload="auto"></video>` : ''
          return html
        } else {
          return '</div>'
        }
      },
    },
  ]
}
