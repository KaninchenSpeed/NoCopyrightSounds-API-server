# NoCopyrightSounds-API-server

for using my [NCS-API library](https://github.com/KaninchenSpeed/NoCopyrightSounds-API) in other programming languages and the web

## Note
This package uses gzip with the [compression package](https://www.npmjs.com/package/compression) for compression on all endpoints.


## Installation

you need [NodeJS](https://nodejs.org) for this

install with `npm i -g ncs-api-server` (may require root/sudo on linux)
start with `ncs_api_server <port_nr>`

## Endpionts

? = optional

declarations in typescript format

### /songs

Method: `GET`

Parameters:
```ts
interface SongsReqest {
    page?: number // starts at 1
    all?: boolean // send all songs from cache
}
```

Response:
```ts
interface SongsResponse {
    lastRefresh: number // time since last cache refresh in seconds
    songs: Song {
        name: string
        url: string
        date: JJJJ-MM-DD
        genre: string
        artists: {
            name: string
            url: string
        }[]
        imageUrl: string
        songUrl: string
        tags: {
            name: string
            color: { r: number, g: number, b: number }
            mood: number | null
        }[]
    }[] // array of songs
}
```

### /search

Method: `GET`

Parameters:
```ts
interface SearchReqest {
    page: number // starts at 1
    genre?: number
    mood?: number
    search?: string
}
```

Response:
```ts
interface SongsResponse {
    lastRefresh: number // time since last cache refresh in seconds
    songs: Song {
        name: string
        url: string
        date: JJJJ-MM-DD
        genre: string
        artists: {
            name: string
            url: string
        }[]
        imageUrl: string
        songUrl: string
        tags: {
            name: string
            color: { r: number, g: number, b: number }
            mood: number | null
        }[]
    }[] // array of songs
}
```

### /artist

Method: `GET`

Request:
```ts
interface ArtistReq {
    url: string // escaped url with encodeURIComponent in js | like: encodeURIComponent("/artist/749/felix-samuel")
}
```

Response:
```ts
interface Artist_Info {
    name: string
    url: string
    genres: string[]
    featured: Song {
        name: string
        url: string
        date: JJJJ-MM-DD
        genre: string
        artists: {
            name: string
            url: string
        }[]
        imageUrl: string
        songUrl: string
        tags: {
            name: string
            color: { r: number, g: number, b: number }
            mood: number | null
        }[]
    }[]
    songs: Song {
        name: string
        url: string
        date: JJJJ-MM-DD
        genre: string
        artists: {
            name: string
            url: string
        }[]
        imageUrl: string
        songUrl: string
        tags: {
            name: string
            color: { r: number, g: number, b: number }
            mood: number | null
        }[]
    }[]
}
```