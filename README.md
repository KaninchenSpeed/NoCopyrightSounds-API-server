# NoCopyrightSounds-API-server

for using my [NCS-API library](https://github.com/KaninchenSpeed/NoCopyrightSounds-API-server.git) in other programming languages


## Installation

you need NodeJS for this

clone this repository `
git clone https://github.com/KaninchenSpeed/NoCopyrightSounds-API-server.git
`


build `
npm run build
`

run `
npm run start
`

## Endpionts

/songs
Method: GET
Parameters:    ? = optional
    page?: number
Response:
    [
        {
            name: string
            date: JJJJ-MM-DD
            genre: string
            artists: [
                {
                    name: string
                    url: string
                }
            ]
        }
    ]