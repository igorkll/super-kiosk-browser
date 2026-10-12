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

function argparser_readNonPositionArg(nonPositionArgs, name, def=null) {
    const prefix = `--${name}=`
    const arg = nonPositionArgs.find(arg => arg.startsWith(prefix))
    return arg ? arg.slice(prefix.length) : def
}

function argparser_readNonPositionArg_number(nonPositionArgs, name, def=null) {
    const readed = argparser_readNonPositionArg(nonPositionArgs, name, def)
    return readed ? Number(readed) : null
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
