import * as os from 'os'
import * as path from 'path'

var basepath
if (os.platform() === 'win32') {
    basepath = path.join(os.homedir(), "Slack_Mods")
} else {
    basepath = path.join(os.homedir(), ".slack_mods")
}

export { basepath }
export const defaultConfigPath = "./default.config.js"
export const configPath = path.join(basepath, 'config.js')
export const localModsPath = path.join(basepath, "local_mods/")
export const externalModsPath = path.join(basepath, "mods/")
