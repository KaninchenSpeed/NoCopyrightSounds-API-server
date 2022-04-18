import express from 'express'
import cors from 'cors'
import * as ncs from 'nocopyrightsounds-api'


var ready = false
var last_refresh = 0

const app = express()
const client = new ncs.Client({
    cache_path: 'cache.json',
    use_cache: true
})
client.getCache()?.addEventListener('ready', () => ready = true)

setInterval(() => {
    last_refresh++
}, 1000)

app.use(cors({
    origin: '*'
}))


app.get('/', (req, res) => {
    res.json({
        version: 2,
        ready
    })
})

app.get<null, ncs.Song[], null, { page: number }>('/songs', async (req, res) => {
    if (last_refresh >= 1800) {
        last_refresh = 0
        await client.getCache()?.checkForNew()
    }
    client.getSongs(Number(req.query.page ?? 1)).then(songs => {
        res.json(songs)
    })
})

app.get<null, ncs.Song[], null, { genre: number, mood: number, search: string, page: number }>('/search', async (req, res) => {
    const filter: ncs.Filter = {
        genre: req.query.genre ? Number(req.query.genre) : undefined,
        mood: req.query.mood ? Number(req.query.mood) : undefined,
        search: req.query.search ? String(req.query.search) : undefined
    }
    try {
        const resu = await ncs.search(filter, req.query.page ? Number(req.query.page) : 1)
        res.json(resu)
    } catch (err) {
        res.json([])
    }
})

app.get<null, ncs.Artist_info, null, { url: string }>('/artist', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url)
        console.log(url)
        res.json(await ncs.getArtistInfo(url))
    } catch (err) {
        console.error(err)
    }
})


app.listen(3355)