export default ({ $options: { name } }, mod) => {
  return `${name}${mod ? '_' + mod : ''}`
}
