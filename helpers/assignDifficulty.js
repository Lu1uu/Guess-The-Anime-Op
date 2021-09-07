const fs = require('fs')

const assignDifficulty = (difficulty) => {
    const data = JSON.parse(fs.readFileSync('./public/db.json', 'utf-8'))
    const newData = data.map((anime) => {
        return {
            ...anime,
            difficulty,
        }
    })
    fs.writeFileSync('./public/db.json', JSON.stringify(newData))
}

assignDifficulty('easy')
