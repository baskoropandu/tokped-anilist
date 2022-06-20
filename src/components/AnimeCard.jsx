/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { useNavigate } from "react-router-dom";
import {BsCheckLg} from "react-icons/bs";
export default function AnimeCard({anime,multiSelect,addToSelected, selected}) {
    const navigate = useNavigate()
    
    let card = css`
        display:flex;
        flex-direction:column;
        justify-content:end;
        background-image:url(${anime.coverImage.large});
        aspect-ratio:3/4;
        width:200px;
        position:relative;
        @media (max-width: 420px) {
            width:150px;
        }
        color:white;
        border-radius:10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    `
    let selectedStyle = css`
        display:${multiSelect ? "flex" : "none"};
        border-radius:10px;
        align-items:center;
        justify-content:center;
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color:rgba(100, 100, 100, 0.7);
    `

    function handleClick() {
        if(multiSelect){
            addToSelected(anime.id);
        }else{
            navigate(`/animes/${anime.id}`)
        }
    }

    return (
        <button onClick={handleClick} key={anime.id} css={css`border:none;outline:none;background-color:transparent;`}>
            <div css={card}>
                <div css={selectedStyle}>
                    {selected && <BsCheckLg css={css`font-size:50px;color:#3AB0FF;`}/>}
                </div>
                <div css={CardStyles.titleContainer}>
                    <p css={CardStyles.title} title={anime.title.english}>{anime.title.romaji}</p>
                    <p>{anime.startDate.year} - {anime.endDate.year || 'present'}</p>
                </div>
            </div>
        </button>
    )
}

class CardStyles {

    static title = css`
        color:white;
        font-size:16px;
        font-weight:700;
        margin:0;
        width:100%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align:start;
    `
    static titleContainer = css`
        height:100%;
        padding:10px;
        border-radius:10px;
        background-color:rgba(0,0,0,0.3);
        display:flex;
        flex-direction:column;
        justify-content: end;
        align-items: start;
    `
}