const path = require('path')
const fs = require('fs-extra')
const walk = require('walkdir')
const os = require('os')
const paths = require('./paths')
const mods = require('./mods')

// Load config
let configPath = paths.configPath
if (!fs.existsSync(configPath)) {
    fs.copySync(paths.defaultConfigPath, configPath)
}

try {
    config = require(configPath)
} catch (e) {
    desktop.notice.notify({ 'title': 'Slack Mods error', 'content': 'Error parsing mods config' })
    config = require(paths.defaultConfigPath)
}

// Loading libs
let libpath = path.join(paths.basepath, "lib")
fs.readdir(libpath, (err, files) => {
    if (err) {
        console.error("Slack Mods: Loading /lib got error: ", err)
    }
    files.forEach(file => {
        require(path.join(libpath, file))
    })
})

let foundMods = mods.findMods()
let mods = mods.loadMods(foundMods)


window['slackmods'] = {}
window['slackmods'].config = config
// window['slackmods'].mods = mods



window['slackmods'].require = require