/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { useEffect,useState } from 'react';
import { Link, useNavigate, useSearchParams } from "react-router-dom"

import {IoSearch} from 'react-icons/io5';

export default function Navbar(params) {
    const [search, setSearch] = useState();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');
    const navigate = useNavigate()
    useEffect(()=>{
        if(searchQuery){
            setSearch(searchQuery);
        }else {
            setSearch('')
        }
    },[searchQuery])

    function handleSearch(e){
        e.preventDefault();
        navigate('/?search='+search)
    }

    return (
        <div css={Styles.container}>
            <Link to="/">
                <img css={Styles.logo} src="https://ik.imagekit.io/ztg2jcaeb0e/animeplus/Untitled_design_RzcPOs_V-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1655352105868" alt="animeplus Logo" />
            </Link>
            <form css={Styles.formContainer}>
                <input css={Styles.search} type="text" placeholder="Search Anime" value={search} onChange={(e)=>setSearch(e.target.value)} />
                <button css={Styles.searchButton}  onClick={handleSearch}><IoSearch/></button>
            </form>
        </div>
    )
}

class Styles {
    static container = css`
        display:flex;
        justify-content:space-between;
        align-items:center;
        width:100%;
        height:50px;
        background-color:#3AB0FF;
    `
    static logo = css`
        height:20px;
        aspect-ratio:1/1;
        border-radius:50%;
        padding:5px;
        background-color:#F9F2ED;
        margin-left:30vw;
        @media (max-width: 420px) {
            margin-left:10px;
        }
    `

    static formContainer = css`
        display:flex;
        align-items:center;
        border-radius: 30px;
        height:30px;
        background-color:#F9F2ED;
        margin-right:30vw;
        @media (max-width: 420px) {
            margin-right:10px;
        }
    `
    static search = css`
        width:200px;
        height:30px;
        background-color:transparent;
        padding-left:10px;
        padding-right:5px;
        outline:none;
        border:none;
        font-size:1rem;
    `
    static searchButton = css`
        height:100%;
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        font-size:1.5rem;
        display:flex;
        align-items:center;
        color:#3AB0FF;
    `
}