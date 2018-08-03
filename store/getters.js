import { heading12, heading34 } from '../modules/regex.js'
export default {
  currentPages(state, { currentContent }) {
    return []
  },
  currentHeading(state, { currentPages }) {
    return currentPages.map(content => {
      let matched = content.match(heading12)
      if (matched && matched[1] !== '') return matched[1]
      matched = content.match(heading34)
      if (matched && matched[1] !== '') return matched[1]
      return 'No Heading'
    })
  },
  filterStyle({ filter }) {
    const { brightness, contrast, saturate } = filter
    return `filter: brightness(${brightness}) contrast(${contrast}) saturate(${saturate});`
  },
}
