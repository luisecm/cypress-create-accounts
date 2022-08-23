const clipboardy = require('clipboardy')

module.exports = (on, config) => {
  on('task', {
    getClipboard() {
      return clipboardy.readSync()
    },
  })
}
