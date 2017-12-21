const os = require('os')
const path = require('path')

let basepath
if (os.platform() === 'win32') {
    basepath = path.join(os.homedir(), "Slack_Mods")
} else {
    basepath = path.join(os.homedir(), ".slack_mods")
}

exports.basepath = basepath
exports.defaultConfigPath = path.join(basepath, "/core/default.config.js")
exports.configPath = path.join(basepath, 'config.js')
exports.modsPath = path.join(basepath, "mods/")
