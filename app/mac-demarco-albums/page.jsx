import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { getSpotifyAccessToken, name } from '../lib/spotifyAuth'
// import { fetchSpotifyToken } from '../lib/spotifyAuth'

async function Page() {

    const token = await getSpotifyAccessToken()
    console.log(token)

  return (
    <div>
        <h1>header</h1>
    </div>
  )
}

export default Page