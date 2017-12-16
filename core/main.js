const path = require('path')
const fs = require('fs-extra')
const walk = require('walkdir')
const os = require('os')

let basepath
if (os.platform() === 'win32') {
    basepath = path.join(os.homedir(), "Slack_Mods")
} else {
    basepath = path.join(os.homedir(), ".slack_mods")
}

// Load config
let configpath = path.join(basepath, 'config.js')
if (!fs.existsSync(configpath)) {
    fs.copySync(path.join(basepath, "/core/default.config.js"), configpath)
}

try {
    exports.config = require(configpath)
} catch (e) {
    desktop.notice.notify({ 'title': 'Slack Mods error', 'content': 'Error parsing mods config' })
    exports.config = require(path.join(basepath, "/core/default.config.js"))
}

// Loading libs
let libpath = path.join(basepath, "lib")
fs.readdir(libpath, function (err, files) {
    if (err) {
        console.error("Slack Mods: Loading /lib got error: ", err)
    }
    files.map(function (file) {
        require(path.join(libpath, file))
    })
})

exports.mods = []
exports.config.localPlugins.forEach(mod => {
    exports.mods.push(require(path.join(basepath, "/mods/", mod)))
})





window['require'] = require
