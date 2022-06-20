/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import {MdKeyboardArrowRight,MdKeyboardArrowLeft} from "react-icons/md";

export default function Pagination({pageInfo,setPage}) {
    const {currentPage, lastPage} = pageInfo;
    let pageList = []
    if(currentPage > 1) pageList.push(<button css={PaginationStyle.button} key={`prev`} onClick={() => setPage(currentPage - 1 )}><MdKeyboardArrowLeft/></button>)
    
    for(let i= 1; i<= lastPage; i++) {
        if(i === currentPage) {
            pageList.push(<button disabled key={i} css={PaginationStyle.currentButton}>{i}</button>)
        }else if(currentPage < 3 && i <= 5) {
            pageList.push(<button css={PaginationStyle.button} key={i} onClick={() => setPage(i)}>{i}</button>)
        }else if(currentPage > lastPage - 2 && i >= lastPage - 5) {
            pageList.push(<button css={PaginationStyle.button} key={i} onClick={() => setPage(i)}>{i}</button>)
        }else if(i <= currentPage + 2 && i >= currentPage - 2) {
            pageList.push(<button css={PaginationStyle.button} onClick={() => setPage(i)} key={i}>{i}</button>)
        }
    }
    if(currentPage < lastPage) pageList.push(<button css={PaginationStyle.button} key={`next`} onClick={() => setPage(currentPage + 1 )}><MdKeyboardArrowRight/></button>)

    return(
        <div css={PaginationStyle.container}>
            {pageList}
        </div>
    )
}

class PaginationStyle {
    static container = css`
        display:flex;
        justify-content:center;
        align-items:center;
        gap:10px;
        margin-top:20px;
    `
    static button = css`
        border:none;
        outline:none;
        display:flex;
        justify-content:center;
        align-items:center;
        aspect-ratio:1/1;
        border-radius:50%;
        background-color:transparent;
        cursor:pointer;
        font-size:20px;
        &:hover {
            background-color:#3AB0FF;
            color:white;
        }
    `

    static currentButton= css`
    border:none;
    outline:none;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:transparent;
    color:#3AB0FF;
    cursor:pointer;
    font-size:20px;
`
}
