let allExtensions = [
    ["commands", addCommands],
    ["sendHandler", addSendHandler],
]

export const availableExtensions = allExtensions.map(x => x[0])

export function loadModExtensions(mod) {
    allExtensions.forEach(([ext, fn]) => {
        if (mod[ext] === undefined) { return }
        fn(mod[ext])
    })
}

export function modHasExtensions(mod) {
    let avaliable = availableExtensions
    return Object.keys(mod).some((x) => avaliable.includes(x))
}

function addCommands(commands) {
    document.addEventListener("DOMContentLoaded", function () {
        Object.entries(commands).forEach(([name, info]) => {
            TS.cmd_handlers['/' + name] = Object.assign({
                type: "client",
                autocomplete: true,
                desc: "No Description",
                func: info.func
            }, info)
        })
    })
}

var originalSubmit
var submitHandlers = []

function addSendHandler(handler) {
    submitHandlers.push(handler)
}


function customSubmit() {
    let msgContent = TS.utility.contenteditable.value(TS.client.ui.$msg_input)
    submitHandlers.forEach(hnd => {
        let newContent = hnd(msgContent)
        if (newContent === null || newContent === undefined || newContent === false) { return }
        msgContent = newContent
    })
    return originalSubmit()
}

document.addEventListener("DOMContentLoaded", function () {
    originalSubmit = TS.view.submit
    TS.view.submit = customSubmit
})

