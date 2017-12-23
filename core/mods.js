const paths = require('./paths')
const path = require('path')
const fs = require('fs')
const nodeModule = require('module')
const config = require(paths.configPath)

nodeModule.globalPaths.unshift(paths.modsPath)

exports.findMods = function () {
    let foundMods = []
    for (let mod of config.localMods) {
        let modpath = path.join(paths.modsPath, mod)
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


exports.loadMods = function (foundMods) {
    let mods = []
    for (let mod of foundMods) {
        console.info(`Loading ${mod.name}: ${require.resolve(mod.path)}`)
        try {
            let loadedMod = require(mod.path)
            mods.push(loadedMod)
        } catch (error) {
            console.error(`Could not load ${foundPlugin.name}:`, error)
        }
    }
    return mods
}