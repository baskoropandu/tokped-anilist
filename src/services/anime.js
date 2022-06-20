import { useQuery } from "@apollo/client";
import { get_all_animes_query, get_anime_details_query } from "./queries";

export function GetAllAnimes(page = 1, perPage = 50, search = null) {
    const variables = {
        "search": search,
        "page": page ,
        "perPage": perPage ,
    }
    return useQuery(get_all_animes_query, {
        variables,
    });
    // if (loading) return `loading`;
    // if (error) return `Error! ${error}`;
    // return data;
}

export function GetAnimeDetails(mediaId) {
    const variables = {
        "mediaId": mediaId,
    }
    return useQuery(get_anime_details_query, {
        variables,
    });
    // if (loading) return null;
    // if (error) return `Error! ${error}`;
    // return data;
}