import axios from 'axios'
const fs = process.server ? require('fs') : null
const path = process.server ? require('path') : null
const request = process.server
  ? function(filePath) {
      const file = fs.readFileSync(path.resolve(filePath), 'utf-8')
      try {
        return JSON.parse(file)
      } catch (e) {
        return file
      }
    }
  : function(filePath) {
      return axios.get(filePath).then(res => res.data)
    }

export default request
