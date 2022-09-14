import express from 'express'
import cors from 'cors'
import compression from 'compression'
import * as ncs from 'nocopyrightsounds-api'

interface JsonError {
    error: string
}

interface SongResponse {
    songs: ncs.Song[]
    lastRefresh: number
}

let ready = false
let lastRefresh = 0
let refreshing = false

const client = new ncs.Client({
    cache_path: 'cache.json',
    use_cache: true,
    detailed_log: true
})
client.getCache()?.addEventListener('ready', () => ready = true)

setInterval(() => {
    lastRefresh++
}, 1000)

const refesh = async () => {
    if (refreshing || lastRefresh < 1800) return
    refreshing = true
    await client.getCache()?.checkForNew()
    lastRefresh = 0
    refreshing = false
}

const app = express()

app.use(cors({
    origin: '*'
}))
app.use(compression())

app.get('/', (req, res) => {
    res.json({
        version: 2,
        ready
    })
})

app.get<null, SongResponse | JsonError, null, { page: number, all: string }>('/songs', async (req, res) => {
    refesh()
    if (req.query.all == 'true') {
        const cache = client.getCache()
        if (!cache) {
            res.status(500).json({ error: 'cache not found' })
            throw 'cache not found'
        }
        res.json({
            lastRefresh,
            songs: cache.songs
        })
    } else {
        const songs = await client.getSongs(Number(req.query.page ?? 1))
        res.json({
            lastRefresh,
            songs
        })
    }
})

app.get<null, SongResponse, null, { genre: number, mood: number, search: string, page: number }>('/search', async (req, res) => {
    const filter: ncs.Filter = {
        genre: req.query.genre ? Number(req.query.genre) : undefined,
        mood: req.query.mood ? Number(req.query.mood) : undefined,
        search: req.query.search ? String(req.query.search) : undefined
    }
    try {
        const resu = await ncs.search(filter, req.query.page ? Number(req.query.page) : 1)
        res.json({
            lastRefresh,
            songs: resu
        })
    } catch (err) {
        res.json({
            lastRefresh,
            songs: []
        })
    }
})

app.get<null, ncs.Artist_info | JsonError, null, { url: string }>('/artist', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url)
        console.log(url)
        res.json(await ncs.getArtistInfo(url))
    } catch (err) {
        console.error(err)
        res.status(400).json({ error: 'artist not found' })
    }
})

if (process.argv.length < 3 || !process.argv[2]) {
    console.error('please add a port! (ncs_api_server 3355)')
}
app.listen(Number(process.argv[2] ?? 3355))
console.log('started surcessfully')