/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { EditCollectionName, GetCollectionList, RemoveCollection } from "../services/collections";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import {MdOutlineClose} from 'react-icons/md';
import {AiOutlineDelete,AiOutlineEdit} from 'react-icons/ai';
import {MdKeyboardArrowLeft} from "react-icons/md";

export default function CollectionList(params) {
    const [selectedCollection, setSelectedCollection] = useState({})
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalOption,setModalOption] = useState('')

    const collections = GetCollectionList() || [];
    const navigate = useNavigate()

    const collectionsComponent =  collections?.map(collection =>{
        return (
            <tr key={collection.id}>
                <td onClick={()=> navigate(`/collections/${collection.id}`)}>
                    <p><button css={CollectionListStyles.titleButton} >{collection.name}</button></p>
                </td>
                <td onClick={()=> navigate(`/collections/${collection.id}`)}>
                    <p>
                        {collection.animes.length} animes
                    </p>
                </td>
                <td css={CollectionListStyles.buttonContainer}>
                    <p>
                        <button css={CollectionListStyles.editButton} onClick={()=>openModal(collection,'edit')}><AiOutlineEdit/></button>
                        <button css={CollectionListStyles.deleteButton} onClick={()=>openModal(collection,'delete')}><AiOutlineDelete/></button>

                    </p>
                </td>
            </tr>
        )
    })

    function openModal(collection,option) {
        setModalOption(option)
        setSelectedCollection(collection)
        setIsOpen(true);
    }

    function closeModal() {
        setSelectedCollection({})
        setIsOpen(false);
    }

    function handleOnChangeName(e){
        let collection = {...selectedCollection}
        collection.name = e.target.value
        setSelectedCollection(collection)
    }

    function handleConfirmChangeName(){
        let responses = EditCollectionName(selectedCollection.name,selectedCollection.id)
        if(responses){
            responses.forEach(response => {
                toast.error(response)
            })
        }else{
            toast.success('Collection name changed')
            closeModal()
        }
    }

    function handleDeleteButton(){
        RemoveCollection(selectedCollection.id)
        toast.success('Collection deleted')
        closeModal()
    }

    return (
        <div css={CollectionListStyles.container}>
            <button css={CollectionListStyles.backButton} onClick={()=> navigate(-1)} title="go back"><MdKeyboardArrowLeft/></button>
            <p css={css`font-weight:600;`}>Collection List</p>

            <table css={CollectionListStyles.table}>
                <tbody>
                    {collectionsComponent}
                </tbody>
            </table>
            <Modal css={CollectionListStyles.modal} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div css={CollectionListStyles.innerModal}>
                <button css={CollectionListStyles.closeButton} onClick={closeModal}><MdOutlineClose/></button>
                    {modalOption === 'edit' ?
                    (
                    <div>
                        <p css={css`font-weight:600;`}>Edit</p>
                        <div css={CollectionListStyles.editForm}>
                            <label htmlFor="editName">Collection Name</label>
                            <input type='text' name='editName' value={selectedCollection.name} onChange={handleOnChangeName}/>
                            <div css={CollectionListStyles.modalButtonContainer}>
                                <button css={CollectionListStyles.editButton} onClick={handleConfirmChangeName}>Confirm</button>
                                <button css={CollectionListStyles.deleteButton} onClick={closeModal}>Cancel</button>
                            </div>
                        </div>
                    </div>
                    )
                    :
                    (
                    <div>
                        <p css={css`font-weight:600;`}>Delete</p>
                        <p>Are you sure you want to delete {selectedCollection.name} collection?</p>
                        <div css={CollectionListStyles.modalButtonContainer}>
                            <button css={CollectionListStyles.editButton} onClick={handleDeleteButton}>Yes</button>
                            <button css={CollectionListStyles.deleteButton} onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                    )
                    }
                </div>
            </Modal>
        </div>
    )
}

class CollectionListStyles {
    static container = css`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        position:relative;
    `
    static backButton = css`
        position:absolute;
        top:0;
        left:0;
        margin-top:10px;
        margin-left:30%;
        background-color: #3AB0FF;
        display:flex;
        justify-content:center;
        align-items:center;
        color: #fff;
        border-radius: 5px;
        aspect-ratio: 1;
        width: 40px;
        font-size:20px;
        border-radius: 50%;
        border:none;
        outline:none;
        cursor:pointer;
        @media (max-width: 420px) {
            margin-left:10px;
        }
    `
    static modal = css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
    `
    static innerModal = css`
        width: 80vw;
        max-width: 500px;
        max-height:50vh;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 10px;
        position:relative;
    `
    static closeButton = css`
        position:absolute;
        top:0;
        right:0;
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        aspect-ratio:1;
        font-size:1.5rem;
        margin-right: 10px;
        margin-top: 10px;
    `
    static editForm = css`
        display:flex;
        flex-direction:column;
        gap:10px;
    `

    static modalButtonContainer = css`
        display:flex;
        justify-content:center;
        align-items:center;
        gap:10px;
    `

    static table = css`
        width:80vw;
        max-width: 500px;
    `
    static titleButton = css`
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        font-size:16px;
        &:hover{
            opacity:0.5;
        }
    `
    static buttonContainer= css`
        height:100%;
        width:100%;
        display:flex;
        justify-content:end;
        align-items:center;
        gap:5%;
    `
    static editButton = css`
        text-align:center;
        background-color: #3AB0FF;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        border:none;
        outline:none;
        cursor:pointer;
    `

    static deleteButton = css`
        margin-left:5px;
        text-align:center;
        background-color: #F87474;
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        border:none;
        outline:none;
        cursor:pointer;
    `
}