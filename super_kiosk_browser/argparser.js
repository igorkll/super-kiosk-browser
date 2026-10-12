function argparser_parseArgs(args) {
    const positionArgs = []
    const nonPositionArgs = []

    args.forEach(el => {
        if (el.startsWith("-")) {
            nonPositionArgs.push(el)
        } else {
            positionArgs.push(el)
        }
    });

    return {positionArgs, nonPositionArgs}
}

function argparser_readPositionArg(positionArgs, index, def=null) {
    if (positionArgs.length <= index) return def
    return positionArgs[index] ?? def
}

function argparser_readNonPositionArg(nonPositionArgs, name, def=null) {
    const prefix = `--${name}=`
    const arg = nonPositionArgs.find(arg => arg.startsWith(prefix))
    return arg ? arg.slice(prefix.length) : def
}

function argparser_readNonPositionArg_number(nonPositionArgs, name, def=null) {
    def = def != null ? Number(def) : null
    const readed = argparser_readNonPositionArg(nonPositionArgs, name, def)
    if (readed == null) return def
    if (readed.length === 0) return def
    const num = Number(readed)
    if (Number.isNaN(num)) return def
    return num
}

function argparser_checkNonPositionArg(nonPositionArgs, name) {
    const prefix = `--${name}`
    const arg = nonPositionArgs.find(arg => arg === prefix)
    return !!arg
}

function argparser_checkNonPositionFlag(nonPositionArgs, name) {
    const prefix = `-${name}`
    const arg = nonPositionArgs.find(arg => arg === prefix)
    return !!arg
}
