/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { useState } from 'react';

import AnimeCard from "../components/AnimeCard";
import Pagination from '../components/Pagination';

import { GetAllAnimes } from "../services/anime";
import {BiSelectMultiple} from 'react-icons/bi';
import {MdOutlineCancel} from 'react-icons/md';
import {AiOutlineAppstore} from 'react-icons/ai'
import AddToCollectionModal from '../components/AddToCollectionModal';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function AnimeList(params) {
    const [multiSelect, setMultiselect] = useState(false);
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [searchQuery, setSearchQuery] = useState(null);
    const [page,setPage] = useState(1);
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search');

    useEffect(()=>{
        if(search){
            setSearchQuery(search);
        }else {
            setSearchQuery(null);
        }
    },[search])

    const {loading, error, data :animeList} = GetAllAnimes(page,10,searchQuery);
    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>

    const pageInfo = animeList?.Page?.pageInfo;


    let animeListComponent = animeList?.Page?.media?.map((anime) => {
        let selected = selectedAnimes.find(item => item === anime.id) ? true : false;
        return (
            <AnimeCard key={anime.id} anime={anime} multiSelect={multiSelect} addToSelected={addToSelected} selected={selected} />
        )
    })
 

    let addToCollection = css`
        display:${!multiSelect ? 'none' : 'block'};
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        color: #3AB0FF;
        font-size:30px;

    `
    
    function addToSelected(id){
        const found = selectedAnimes.find(item => item === id);
        if(!found){
            setSelectedAnimes([...selectedAnimes,id]);
        }else {
            setSelectedAnimes(selectedAnimes.filter(item => item !== id));
        }
    }

    function handleMultiSelect() {
        setMultiselect(!multiSelect);
        if(multiSelect){
            setSelectedAnimes([]);
        }
    }

    return(
        <div css={ListStyles.container}>
            <div css={ListStyles.multiSelectContainer}>
                {multiSelect  ? (<AddToCollectionModal buttonStyle={addToCollection} ids={selectedAnimes} setMultiSelect={setMultiselect} setSelected={setSelectedAnimes}/>):(<button css={ListStyles.multiSelect} onClick={()=> navigate('/collections')}><AiOutlineAppstore/></button>)}
                
                
                <button css={ListStyles.multiSelect} onClick={handleMultiSelect}>
                    {multiSelect ? <MdOutlineCancel css={css`color:#F87474`}/>:<BiSelectMultiple/>}
                </button>
            </div>
            <div css={ListStyles.listContainer}>
                {animeListComponent}
            </div>
            <div>
                <Pagination pageInfo={pageInfo} setPage={setPage}/>
            </div>
        </div>
        
    )
}

class ListStyles {
    static multiSelectContainer = css`
        display:flex;
        justify-content:flex-end;
    `
    static multiSelect = css`
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        color: #3AB0FF;
        font-size:30px;
    `
    static listContainer = css`
        display: grid;
        justify-items:center;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        @media (max-width: 420px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        gap: 1rem;
    `
    static container = css`
        padding-right:30%; 
        padding-left:30%;
        padding-top:50px;
        padding-bottom:50px;
        width:40vw;
        @media(max-width: 420px) {
            padding-right: 5vw;
            padding-top:10px;
            padding-left: 5vw;
            width:90vw
        }
    `
}