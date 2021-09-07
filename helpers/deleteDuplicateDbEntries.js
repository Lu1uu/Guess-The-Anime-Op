const fs = require('fs')
const removeDuplicates = () => {
    const data = JSON.parse(fs.readFileSync('../public/db.json', 'utf-8'))
    const uniqueData = getUniqueListBy(data, 'animeEnglish', 'type')
    const sortedData = getSortedData(uniqueData, 'animeEnglish', true)
    const trimmedData = sortedData.map((anime) => {
        return {
            annId: anime.annId,
            animeEnglish: anime.animeEnglish,
            animeRomaji: anime.animeRomaji,
            songName: anime.songName,
            type: anime.type,
            linkWebm: anime.linkWebm,
            linkMP3: anime.linkMP3,
            difficulty: anime?.difficulty,
        }
    })
    fs.writeFileSync('../public/db.json', JSON.stringify(trimmedData))
}

function getSortedData(data, prop, isAsc) {
    return data.sort((a, b) => {
        return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
    })
}

// Unique under 1 key
// function getUniqueListBy(arr, key) {
//     return [...new Map(arr.map((item) => [item[key], item])).values()]
// }

// Unique under two keys
function getUniqueListBy(arr, key1, key2) {
    return [...new Map(arr.map((item) => [item[key1] + item[key2], item])).values()]
}

removeDuplicates()
