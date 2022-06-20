import { useQuery } from "@apollo/client";
import { get_collection_details_query } from "./queries";

export function GetCollectionDetails(idIn) {
    const variables = {
        "idIn": idIn,
        "page": 1,
        "perPage": 50,
    }

    return useQuery(get_collection_details_query, {
        variables,
    });
}

export function GetCollectionList() {
    return JSON.parse(localStorage.getItem("collection"));
}

export function SetCollection(collection) {
    localStorage.setItem("collection", JSON.stringify(collection));
}

export function CreateCollection(name, animes){
    const localCollection = GetCollectionList() || []

    const errors = validateCollection(name, animes)
    if(errors) return errors
    if(localCollection.length === 0){
        localCollection.push({
            "name": name,
            "animes": animes,
            "id": 1
        })
    }else{
        let lastCollection = localCollection[localCollection.length - 1]
        localCollection.push({
            "name": name,
            "animes": animes,
            "id": lastCollection.id + 1
        })
    }

    SetCollection(localCollection)
    return null
}

export function AddToCollections(animeIds, collectionIds){
    let localCollection = GetCollectionList()
    let errors = []
    collectionIds.forEach(collectionId => {
        const collectionIndex = localCollection.findIndex(collection => collection.id === collectionId)
        const collection = localCollection.find(collection => collection.id === collectionId)
        let animes = collection.animes
        let newAnimeIds = animeIds.filter(animeId => animes.includes(animeId) ? false : true)
        animes = animes.concat(newAnimeIds)
        localCollection[collectionIndex].animes = animes
    })

    if(animeIds.length === 0) errors.push("please choose at least one anime")
    if(collectionIds.length === 0) errors.push("please choose at least one collection")
    
    if(errors.length > 0) return  errors
    SetCollection(localCollection)
    return null
}

export function RemoveCollection(collectionId){
    let localCollection = GetCollectionList()
    const collectionIndex = localCollection.findIndex(collection => collection.id === collectionId)
    localCollection.splice(collectionIndex, 1)
    SetCollection(localCollection)
}

export function RemoveFromCollection(animeIds, collectionId){
    const localCollection = GetCollectionList()
    const collectionIndex = localCollection.findIndex(collection => collection.id === collectionId)
    const collection = localCollection.find(collection => collection.id === collectionId)
    const animes = collection.animes
    animeIds.forEach(animeId =>{
        const index = animes.indexOf(animeId)
        animes.splice(index, 1)
        collection.animes = animes

    })
    localCollection[collectionIndex] = collection

    SetCollection(localCollection)
    return null
}

export function EditCollectionName(newName,collectionId){
    let localCollection = GetCollectionList()
    let collectionTarget = localCollection.find(collection=> collection.id === collectionId)
    let errors = validateCollection(newName, collectionTarget.animes)
    if(errors) return errors

    let collectionTargetIndex = localCollection.findIndex(collection=> collection.id === collectionId)
    collectionTarget.name = newName
    localCollection[collectionTargetIndex] = collectionTarget
    SetCollection(localCollection)
    return null
}


function validateCollection(name, animes){
    const localCollections = GetCollectionList() || [];
    const errors = [];
    if(name.length === 0) errors.push("Collection Name cannot be empty")
    if( localCollections.length > 0){
        localCollections.forEach(localCollection => {
            if(localCollection.name === name){
                errors.push("Collection with same name already exists")
            }
        })
    }

    const specialCharacters = /[^a-zA-Z0-9]/g;
    const containsSpecialChar = specialCharacters.test(name)
    if(containsSpecialChar) errors.push("Collection name can only contain letters and numbers")

    if(animes.length === 0) errors.push("Collection must have at least 1 anime")

    if(errors.length > 0){
        return errors
    }else{
        return null
    }
}