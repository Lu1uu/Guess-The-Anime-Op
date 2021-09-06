const fs = require('fs')
const removeDuplicates = () => {
    const data = JSON.parse(fs.readFileSync('./public/db.json', 'utf-8'))
    const uniqueData = getUniqueListBy(data, 'animeEnglish')
    fs.writeFileSync('./public/db.json', JSON.stringify(uniqueData))
}

function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()]
}

removeDuplicates()
