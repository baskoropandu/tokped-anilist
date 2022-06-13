import React from "react";
import { useParams } from "react-router-dom";

export default function CollectionDetails(params) {
    let { collectionId } = useParams()
    return (
        <h1>COLLECTION DETAILS @id: {collectionId}</h1>
    )
}