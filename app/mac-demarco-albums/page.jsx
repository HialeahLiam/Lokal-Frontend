import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import { getSpotifyAccessToken, name } from '../../lib/spotifyAuth'
// import { fetchSpotifyToken } from '../lib/spotifyAuth'

async function Page() {
    
    const token = await getSpotifyAccessToken()

  
    const spotifyWebApi = new SpotifyWebApi()
    spotifyWebApi.setAccessToken(token)

    console.log('MAC DEMARCO')
    console.log('--------------')
    
    
    performance.mark('A');
    const {items: albums} = await  (await fetch (`https://api.spotify.com/v1/artists/3Sz7ZnJQBIHsXLUSo0OQtM/albums`, {
        headers: {Authorization: `Bearer ${token}`,
        next: {
            validate: 5
        }
        }
        })).json()
    performance.measure('A to Now', 'A');

    
    
    // console.log(`radiohead album fetch took ${(end - start)/1000} seconds`)
    
    performance.mark('B');
    
    await  (await fetch (`https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums`, {
      headers: {Authorization: `Bearer ${token}`}
    })).json()
    
    performance.measure('B to now', 'B')
    
    console.log(performance.getEntriesByType('measure'))
    performance.clearMeasures()
    performance.clearMarks()

  return (
    <div>
        <h1>header</h1>
    </div>
  )
}

export default Page