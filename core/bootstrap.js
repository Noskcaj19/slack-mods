/* v0.0.1
# Slack Mods bootstrap script, injected into Slack at launch
*/

const _path = require('path')
const fs = require('fs')
const os = require('os')

let basedir
if (os.platform() === 'win32') {
    basedir = _path.join(os.homedir(), "Slack_Mods/core/slack_mods.js")
} else {
    basedir = _path.join(os.homedir(), ".slack_mods/core/slack_mods.js")
}

if (!fs.existsSync(basedir)) {
    const { dialog } = require('electron').remote
    dialog.showMessageBox({ type: 'warning', title: 'Slack Mods not installed', message: `Slack Mods is not installed.\nPlease install in '${basedir}'` })
}

function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1)
    }
    return content
}

// Change back to native node require
require.extensions['.js'] = function (module, filename) {
    var content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBOM(content), filename)
}

try {
    require(basedir)
} catch (e) {
    console.error('Error loading bootstrapping Slack Mods', e)
}
