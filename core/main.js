import * as path from 'path'
import * as fs from 'fs'

import * as paths from './paths'
import * as mods from './mods'
import * as menu from './mods_flextab'
import * as nodeRequire from './node_require'

// Load config
let configPath = paths.configPath
if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, nodeRequire(paths.defaultConfigPath).config)
}

try {
    config = nodeRequire(configPath)
} catch (e) {
    desktop.notice.notify({ 'title': 'Slack Mods error', 'content': 'Error parsing mods config' })
    console.error("Got error loading config: ", e)
    config = eval(nodeRequire(paths.defaultConfigPath).config)
}

menu.injectFlextab()
let foundMods = mods.findMods()
foundMods.forEach(mod => {
    menu.addMod(mod)
})
let loadedMods = mods.loadMods(foundMods)


window['slackmods'] = {}
window['slackmods'].config = config
window['slackmods'].mods = loadedMods
window['slackmods'].require = nodeRequire
console.log("Slack mods done")
