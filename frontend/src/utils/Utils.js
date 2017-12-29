function getResourceName(hostname) {
    if (hostname.indexOf('165.227') >= 0) {
        return 'http://165.227.52.154/'
    } else if (hostname.indexOf('csldirectory') >= 0)
        return 'http://www.csldirectory.org/';
    return 'http://127.0.0.1:8000/'
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function removeUnderscores(str) {
    return str.replace(/[-_]/g, " ");
}

function capitalizeWholeStrIfInSet(set, str) {
    const words = str.split(" ");
    return words.map((s) => {
        if (set.has(s.toLowerCase()))
            return s.toUpperCase() + " ";
        return s + " ";
    })
}

const compose = (...fns) => (arg) =>
    fns.reduce(
        (composed, f) => f(composed),
        arg
    )

export {getResourceName, capitalizeFirstLetter, removeUnderscores, compose, capitalizeWholeStrIfInSet}