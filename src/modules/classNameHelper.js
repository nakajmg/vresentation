export default name => {
  const _name = typeof name === 'object' ? name.$options.name : name
  return (mod, ...args) => {
    return { class: `${_name}${mod ? '_' + mod : ''} ${args.join(' ')}` }
  }
}
