import * as express from 'express'
import * as cors from 'cors'
import * as ncs from 'nocopyrightsounds-api'


const app = express()

app.use(cors({
    origin: '*'
}))



app.get('/', (req, res) => {
    res.json({
        version: 1
    })
})


app.get('/songs', (req, res) => {
    ncs.getMusic(Number(req.query.page)).then(songs => {
        res.json(songs)
    })
})

app.get('/search', (req, res) => {
    const filter: ncs.Filter = {
        genre: Number(req.query.genre),
        mood: Number(req.query.mood),
        search: String(req.query.q)
    }
    ncs.search(filter)
})





app.listen(3355)