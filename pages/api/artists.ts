import { NextApiRequest, NextApiResponse } from "next"
import type { NextRequest, NextResponse } from "next/server"
import {getSpotifyAccessToken} from '../../lib/spotifyAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {artist} = req.query
    if (artist === '') {
        const response = {
            artists: {
                items: []
            }
        }
        res.json(response)
        return
    }
    const token = await getSpotifyAccessToken()
    const results = await (await fetch(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).json()
    res.json(results)
    // const url = new URL(host + req.url)
    // console.log(url)
}