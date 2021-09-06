const fs = require('fs')
const removeDuplicates = () => {
    const data = JSON.parse(fs.readFileSync('./public/db.json', 'utf-8'))
    const uniqueData = getUniqueListBy(data, 'animeEnglish')
    const sortedData = getSortedData(uniqueData, 'animeEnglish', true)
    fs.writeFileSync('./public/db.json', JSON.stringify(sortedData))
}

function getSortedData(data, prop, isAsc) {
    return data.sort((a, b) => {
        return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
    })
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()]
}

removeDuplicates()
