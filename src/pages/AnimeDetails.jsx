import React from "react"
import { useParams } from "react-router-dom"

export default function AnimeDetails(params) {
    let { animeId } = useParams()
    return (
        <h1>ANIME DETAILS @id:{animeId}</h1>
    )
}