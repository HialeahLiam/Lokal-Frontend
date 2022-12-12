import React from 'react'
import { getSpotifyAccessToken } from '../lib/spotifyAuth'

async function Page() {

    const token = await getSpotifyAccessToken()
    console.log(token)
  return (
    <div>Page</div>
  )
}

export default Page