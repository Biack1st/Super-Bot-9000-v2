function ezrandom(min,max){
    return Math.round(Math.random()*(max,min)+min)
}

function roulette(min,max){
    const randomedchance = ezrandom(min,max)
    return randomedchance
}

module.exports = roulette