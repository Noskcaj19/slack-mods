import * as paths from './paths'
import * as path from 'path'
import * as fs from 'fs'
import * as nodeModule from 'module'
import * as extensions from './extensions'
import * as nodeRequire from './node_require'
// Dynamic import
const config = nodeRequire(paths.configPath)

nodeModule.globalPaths.unshift(paths.localModsPath)

export function findMods() {
    let foundMods = []
    for (let mod of config.localMods) {
        let modpath = path.join(paths.localModsPath, mod)
        if (!fs.existsSync(modpath)) {
            continue
        }
        let infoPath = path.join(modpath, "package.json")
        if (fs.existsSync(infoPath)) {
            let info
            try {
                info = JSON.parse(fs.readFileSync(infoPath, { encoding: 'utf-8' }))
            } catch (e) {
                console.error(`Error occured while fetching data for ${mod}: ${e}`)
            }
            if (!info.keywords || !info.keywords.includes('slack-mods')) {
                continue
            }
            foundMods.push({
                name: info.name,
                displayname: info.displayname,
                package: mod,
                version: info.version,
                description: info.description,
                author: info.author,
                path: modpath,
                icon: info.icon ? info.icon : null
            })
        }
    }
    return foundMods
}


export function loadMods(foundMods) {
    let mods = []
    for (let mod of foundMods) {
        console.info(`Loading ${mod.name}: ${nodeRequire.resolve(mod.path)}`)
        try {
            let loadedMod = nodeRequire(mod.path)
            if (extensions.modHasExtensions(loadedMod)) {
                extensions.loadModExtensions(loadedMod)
            }
            mods.push(loadedMod)
        } catch (error) {
            console.error(`Could not load ${mod.name}:`, error)
        }
    }
    return mods
}
