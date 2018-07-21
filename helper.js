function stateToProps(namespace, stateToProps) {
  if (Array.isArray(stateToProps)) {
    return stateToProps.reduce((ret, key) => {
      ret[key] = state => state[namespace][key]
      return ret
    }, {})
  }
  return Object.keys(stateToProps).reduce((ret, key) => {
    const value = stateToProps[key]
    ret[key] = state => state[namespace][value]
    return ret
  }, {})
}

/* mutations */
function createNamespaced(namespace, options) {
  return Object.keys(options).reduce((ret, key) => {
    const type = options[key]
    ret[key] = `${namespace}/${type}`
    return ret
  }, {})
}
function mutationsToProps(namespace, options) {
  return createNamespaced(namespace, options)
}
function mutationsToEvents(namespace, options) {
  return createNamespaced(namespace, options)
}

function actionsToEvents(namespace, options) {
  return createNamespaced(namespace, options)
}
function actionsToProps(namespace, options) {
  return createNamespaced(namespace, options)
}
function gettersToProps(namespace, options) {
  return createNamespaced(namespace, options)
}
