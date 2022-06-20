/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import { useNavigate, useParams } from "react-router-dom";
import {MdKeyboardArrowLeft,MdOutlineCancel,MdOutlineDeleteOutline,MdOutlineClose} from "react-icons/md";
import Modal from 'react-modal';
import {TbEdit} from 'react-icons/tb';
import {CgExtensionRemove}from 'react-icons/cg';

import { EditCollectionName, GetCollectionDetails, GetCollectionList, RemoveCollection, RemoveFromCollection } from '../services/collections';
import AnimeCard from '../components/AnimeCard';
import { useState } from 'react';
import toast from 'react-hot-toast';
export default function CollectionDetails(params) {
    const [multiSelect, setMultiselect] = useState(false);
    const [selectedAnimes, setSelectedAnimes] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalOption, setModalOption]= useState('')
    const [collectionName, setCollectionName] = useState('');
    
    let navigate = useNavigate()

    let { collectionId } = useParams()

    const collections = GetCollectionList()
    const collection  = collections.find(collection => collection.id === +collectionId)
    const {loading,error,data} = GetCollectionDetails(collection.animes)

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error</div>

    const {media} =  data?.Page


    const cardComponents = media.map(anime => {
        let selected = selectedAnimes.find(item => item === anime.id) ? true : false;
        return(
            <AnimeCard key={anime.id} anime={anime} multiSelect={multiSelect} addToSelected={addToSelected} selected={selected} />
            
        )
    })

    let modalComponent = null;

    switch(modalOption){
        case 'edit':
            modalComponent = (
                <div>
                    <p css={css`font-weight:600;`}>Edit</p>
                    <div css={CollectionDetailsStyles.editForm}>
                        <label htmlFor="editName">Collection Name</label>
                        <input type='text' name='editName' value={collectionName} onChange={(e)=> setCollectionName(e.target.value)}/>
                        <div css={CollectionDetailsStyles.modalButtonContainer}>
                            <button css={CollectionDetailsStyles.editButton} onClick={confirmEdit}>Confirm</button>
                            <button css={CollectionDetailsStyles.cancelButton} onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
            break;
        case 'multipleDelete':
            modalComponent = (
                <div>
                    <p css={css`font-weight:600;`}>Delete</p>
                    <p>Are you sure you want to delete these animes from collection {collection.name}?</p>
                    <div css={CollectionDetailsStyles.modalButtonContainer}>
                        <button css={CollectionDetailsStyles.editButton} onClick={confirmMultipleDelete}>Yes</button>
                        <button css={CollectionDetailsStyles.cancelButton} onClick={closeModal}>Cancel</button>
                    </div>
                </div>
                )
            break;
        case 'deleteCollection':
            modalComponent = (
            <div>
                <p css={css`font-weight:600;`}>Delete</p>
                <p>Are you sure you want to delete collection {collection.name}?</p>
                <div css={CollectionDetailsStyles.modalButtonContainer}>
                    <button css={CollectionDetailsStyles.editButton} onClick={confirmCollectionDelete}>Yes</button>
                    <button css={CollectionDetailsStyles.cancelButton} onClick={closeModal}>Cancel</button>
                </div>
            </div>
            )
            break;
        default:
            modalComponent = null;
            break;
    }

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

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setModalOption('');
    }

    function onDeleteButton(){
        if(multiSelect){
            setModalOption('multipleDelete');
        }else {
            setModalOption('deleteCollection')
        }
        openModal();
    }

    function onEditButton(){
        setCollectionName(collection.name);
        setModalOption('edit');
        openModal();
    }

    function confirmEdit(){
        let responses = EditCollectionName(collectionName,collection.id)
        if(responses){
            responses.forEach(response => {
                toast.error(response)
            })
        }else{
            toast.success('Collection name changed')
            closeModal()
        }
    }

    function confirmCollectionDelete(){
        RemoveCollection(collection.id)
        toast.success('Collection deleted')
        closeModal()
        navigate('/collections')
    }

    function confirmMultipleDelete(){
        let response = RemoveFromCollection(selectedAnimes,collection.id);
        if(!response) toast.success('Animes removed from collection');
        closeModal();
        setIsOpen(false);
        setSelectedAnimes([]);
    }

    return (
        <div css={CollectionDetailsStyles.container}>
            <button css={CollectionDetailsStyles.backButton} onClick={()=> navigate(-1)} title="go back"><MdKeyboardArrowLeft/></button>
            <div css={CollectionDetailsStyles.rightButtons}>
                {!multiSelect &&
                (<button css={CollectionDetailsStyles.multiDeleteButton} onClick={onEditButton} >
                    <TbEdit/>
                </button>)
                }
                <button css={CollectionDetailsStyles.multiDeleteButton} onClick={handleMultiSelect}>
                    {multiSelect ? <MdOutlineCancel css={css`color:white`}/>:<CgExtensionRemove/>}
                </button>
                <button css={CollectionDetailsStyles.deleteButton} onClick={onDeleteButton} >
                    <MdOutlineDeleteOutline/>
                </button>
            </div>
            <p css={CollectionDetailsStyles.title}>Collection {collection.name}</p>
            <div css={CollectionDetailsStyles.cardContainer}>
                {cardComponents}
            </div>
            <Modal css={CollectionDetailsStyles.modal} isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div css={CollectionDetailsStyles.innerModal}>
                    <button css={CollectionDetailsStyles.closeModalButton} onClick={closeModal}><MdOutlineClose/></button>
                    {modalComponent}
                </div>
            </Modal>
        </div>
    )
}

class CollectionDetailsStyles {
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
    static closeModalButton = css`
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
        padding: 0;
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

    static cancelButton = css`
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

    static container = css`
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        position:relative;
    `
    static title = css`
        font-weight:600;
        @media (max-width: 420px) {
            margin-top:60px;
        }
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
    static rightButtons = css`
        position:absolute;
        top:0;
        right:0;
        margin-top:10px;
        margin-right:30%;
        display:flex;
        justify-content:end;
        gap:10px;
        @media (max-width: 420px) {
            margin-right:10px;
        }
        
    `
    static multiDeleteButton = css`
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
    `

    static deleteButton = css`
        background-color: #F87474;
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
    `

    static cardContainer = css`
        display: grid;
        justify-items:center;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        @media (max-width: 420px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        gap: 1rem;
    `
}