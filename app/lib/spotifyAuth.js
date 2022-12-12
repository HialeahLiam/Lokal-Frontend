import { readFile, writeFile } from "fs/promises"
import path from "path"
import { CACHE_FILE_PATH } from "./server-constants"

export const fetchTokenWithClientCredentialsFlow = async () => {
    const encodedFormData = new URLSearchParams('grant_type=client_credentials')

    const url = 'https://accounts.spotify.com/api/token'
    const requestInit = {
        headers: {
            'Authorization': 'Basic ' + btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedFormData,
        method: "post"   
    }
    const response = await fetch(url, requestInit)
    const payload = await response.json()
    
    return payload

}





const getSpotifyTokenFromCache = async () => {
    try {
        const cache = JSON.parse(await readFile(CACHE_FILE_PATH, {encoding: 'utf8'}))
        return cache.spotify_token
    } catch (error) {
        return null
    }

}

const appendSpotifyTokenToCache = async (tokenObject) => {
    let cache;
    try {
        cache = JSON.parse(await readFile(CACHE_FILE_PATH, {encoding: 'utf8'}))
    } catch (error) {
        cache = {}
    }

    cache.spotify_token = tokenObject
    await writeFile(CACHE_FILE_PATH, JSON.stringify(cache))
}

const isExpired = (tokenObject) => {
    return Date.now() / 1000 > tokenObject.expires_in + tokenObject.retrievalDate
}

export const getSpotifyAccessToken = async () => {
    let tokenObject = await getSpotifyTokenFromCache()

    if ( !tokenObject || isExpired(tokenObject)) {
        tokenObject = await fetchTokenWithClientCredentialsFlow()
        tokenObject.retrievalDate = Date.now() / 1000
        console.log(tokenObject)
        await appendSpotifyTokenToCache(tokenObject)
    }
    
    return tokenObject.access_token
}
