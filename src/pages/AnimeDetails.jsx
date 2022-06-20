/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { useParams, useNavigate } from "react-router-dom"
import { GetAnimeDetails } from "../services/anime"
import {MdKeyboardArrowLeft} from "react-icons/md";
import AddToCollectionModal from '../components/AddToCollectionModal';

export default function AnimeDetails(params) {
    const { animeId } = useParams()
    const {loading,error,data} = GetAnimeDetails(animeId)
    const navigate = useNavigate()
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>
    
    let details = data

    const {title,bannerImage,description,episodes, popularity,averageScore} = details?.Media
    // let title = details?.Media?.title
    // let bannerImage = details?.Media?.bannerImage
    // let description = details?.Media?.description
    let bannerStyle = css`
        background-image:url(${bannerImage});
        height:27vh;
        background-size: cover;
        background-position: center top;
    `


    return (
        <div>
            <div css={bannerStyle}>
                <div css={Styles.bannerContainer}>
                    <div css={Styles.buttonContainer}>
                        <button css={Styles.backButton} onClick={()=> navigate(-1)} title="go back"><MdKeyboardArrowLeft/></button>
                        <AddToCollectionModal buttonStyle={Styles.addToCollectionButton} ids={[details?.Media?.id]}/>
                        {/* <button css={Styles.addToCollectionButton} title="add to collection"><MdDashboardCustomize/></button> */}
                    </div>
                    <div css={Styles.innerBanner}>
                        <h1 css={Styles.title} title={title.english}>{title.romaji || title.english}</h1>
                        <h3 css={Styles.year}>{details?.Media?.startDate.year} - {details?.Media?.endDate.year || 'present'}</h3>
                    </div>
                    

                </div>
            </div>
            <div css={Styles.infoContainer}>
                <p css={Styles.info}>Total Episodes: {episodes}</p>
                <p css={Styles.info}>Popularity: {popularity}</p>
                <p css={Styles.info}>Average Score: {averageScore}</p>

            </div>
            <p css={Styles.info}>Description :</p>
            <p css={Styles.description} dangerouslySetInnerHTML={{__html: description}}></p>
        </div>
        // <h1>anime details</h1>
    )
}

class Styles {
    static infoContainer = css`
        display:grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        justify-items:center;
        padding-left:30%;
        padding-right:30%;
        @media (max-width: 420px) {
            padding:10px;
        }
    `

    static info = css`
        font-weight:600;
    `

    static title = css`
        color:white;
        padding-left:30%;
        margin:0;
        @media (max-width: 420px) {
            padding-left:10px;
        }
    `
    static year = css`
    margin:0;
    padding-left:30%;
    padding-right:30%;
    padding-bottom:10px;
    color:white;
    @media (max-width: 420px) {
        padding-left:10px;
        padding-bottom:10px;
    }
    `
    static innerBanner = css`
        width:100%;
        display:flex;
        flex-direction:column;
        justify-content:end;
    `
    static bannerContainer = css`
        height:100%;
        display:flex;
        background-color:rgba(100, 100, 100, 0.7);
        flex-direction:column;
        justify-content:space-between;
        
    `

    static buttonContainer = css`
        margin: 20px 30% 10px 30%;
        display:flex;
        padding-top:50px;
        flex-direction:row;
        justify-content:space-between;
        @media (max-width: 420px) {
            padding-top: 0;
        }
        @media (max-width: 420px) {
            margin: 10px
        }
    `

    static addToCollectionButton = css`
        
        background-color: #3AB0FF;
        color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        font-size: 20px;
        border: none;
        outline: none;
        aspect-ratio: 1;
        &:hover {
            background-color: transparent;
            color: #3AB0FF;
            cursor: pointer;
        }
        
    `
    static addToCollectionButtonContainer = css`
        @media (max-width: 420px) {
            margin: 10px
        }
    `

    static backButton = css`
    background-color: #3AB0FF;
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    font-size: 20px;
    border: none;
    outline: none;
    aspect-ratio: 1;
    &:hover {
        background-color: transparent;
        color: #3AB0FF;
        cursor: pointer;
    }
    
    `
    static description = css`
        padding-left:30%;
        padding-right:30%;
        @media (max-width: 420px) {
            padding:10px;
        }
    `
}