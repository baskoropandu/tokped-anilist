import { gql } from "@apollo/client"

export const get_all_animes_query = gql`query ($id: Int, $page: Int, $perPage: Int, $search: String) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (id: $id, search: $search) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        endDate {
          year
        }
        startDate {
          year
        }
      }
    }
  }` 

export const get_anime_details_query = gql`query Media($mediaId: Int) {
    Media(id: $mediaId) {
      id
      title {
        english
        romaji
      }
      description
      episodes
      countryOfOrigin
      coverImage {
        large
      }
      bannerImage
      popularity
      averageScore
      endDate {
        year
      }
      startDate {
        year
      }
    }
  }`

export const get_collection_details_query = gql`query ($page: Int, $perPage: Int, $idIn: [Int]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media (id_in: $idIn) {
        id
        title {
          english
          romaji
        }
        coverImage {
          large
        }
        endDate {
          year
        }
        startDate {
          year
        }
      }
    }
  }`
