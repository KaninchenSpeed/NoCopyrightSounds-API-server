# NoCopyrightSounds-API-server

for using my [NCS-API library](https://github.com/KaninchenSpeed/NoCopyrightSounds-API) in other programming languages and the web


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
interface SongsReq {
    page?: number // starts at 1
}
```

Response:
```ts
interface Song {
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
```

### /search

Method: `GET`

Parameters:
```ts
interface SearchReq {
    page: number // starts at 1
    genre?: number
    mood?: number
    search?: string
}
```

Response:
```ts
interface Song {
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
    featured: Song[] // as mentioned before
    songs: Song[]
}
```