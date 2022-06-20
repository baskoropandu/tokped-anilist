/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx,css } from '@emotion/react'
import Modal from 'react-modal';

import {AiOutlineAppstoreAdd} from 'react-icons/ai';
import {MdOutlineClose} from 'react-icons/md';
import { AddToCollections, CreateCollection, GetCollectionList } from '../services/collections';
import { useState } from 'react';
import toast from 'react-hot-toast';

Modal.setAppElement('#root');

export default function AddToCollectionModal({buttonStyle,ids,create = false,setSelected = null,setMultiSelect = null}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedCollections, setSelectedCollections] = useState([]);
    const [displayCreateCollection, setDisplayCreateCollection] = useState(create);
    const [collectionName, setCollectionName] = useState('');

    let collectionList = GetCollectionList();

    let collectionListComponent = collectionList?.map((collection) => {
        const {id, name} = collection;
        return (
            <div key={id}>
                <input type={'checkbox'} onChange={() => handleSelect(id)} checked={selectedCollections.includes(id)} id={id} name={name}/>
                <label htmlFor={name}>{name}</label>
            </div>
        )
    })

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleAddToCollections(e) {
        e.preventDefault()
        let response = AddToCollections(ids,selectedCollections);
        if(response){
            response.forEach(error=>{
                toast.error(error)
            })
        }else {
            toast.success(`Successfully added to collection${selectedCollections.length > 1 ? 's' : ''}`)
            closeModal();
            if(setSelected){
                setSelected([])
            }
            if(setMultiSelect){
                setMultiSelect(false)
            }
        }
    }

    function handleSelect(id){
        const found = selectedCollections.find(item => item === id);
        if(!found){
            setSelectedCollections([...selectedCollections,id]);
        }else {
            setSelectedCollections(selectedCollections.filter(item => item !== id));
        }
    }

    function handleCreateCollection(e) {
        e.preventDefault()
        let response = CreateCollection(collectionName, ids);
        if(response){
            response.forEach(error =>{
                toast.error(error)
            })
        }else{
            toast.success('New Collection created')
            closeModal();
        }
    }

    function handleCreateButton(){
        setDisplayCreateCollection(!displayCreateCollection);
        setCollectionName('');
    }

    return (
        <div>
            <button css={buttonStyle} onClick={openModal}><AiOutlineAppstoreAdd/></button>
            <div>
                <Modal css={AddToCollectionStyles.modal} isOpen={modalIsOpen} onRequestClose={closeModal}>
                    <div css={AddToCollectionStyles.innerModal}>
                        <div css={css`${displayCreateCollection ? `display:none`: AddToCollectionStyles.innerInnerModal}`}>
                            <div css={AddToCollectionStyles.topContainer}>
                                <p css={AddToCollectionStyles.title}>Add to Collections</p>
                                <button css={AddToCollectionStyles.button} onClick={closeModal}><MdOutlineClose/></button>
                            </div>
                                <div css={AddToCollectionStyles.collectionListContainer}>
                                    {collectionListComponent}
                                </div>
                                <div css={AddToCollectionStyles.modalButtonContainer}>
                                    <button css={AddToCollectionStyles.confirmButton} onClick={handleAddToCollections}>Add to Collection{selectedCollections.length > 1 && `s`}</button>
                                    <button css={AddToCollectionStyles.confirmButton} onClick={handleCreateButton}>Create New Collection</button>
                                </div>
                        </div>
                        <div css={css`${displayCreateCollection ? AddToCollectionStyles.innerInnerModal: `display:none`}`}>
                            <div css={AddToCollectionStyles.topContainer}>
                                <p css={AddToCollectionStyles.title}>Create New Collection</p>
                                <button css={AddToCollectionStyles.button} onClick={closeModal}><MdOutlineClose/></button>
                            </div>
                            <div css={AddToCollectionStyles.createForm}> 
                                <label htmlFor="newName">Collection Name</label>
                                <input css={AddToCollectionStyles.textInput} type="text" name='newName' onChange={(e) => setCollectionName(e.target.value)} value={collectionName} />
                            </div>
                            <div css={AddToCollectionStyles.modalButtonContainer}>
                                <button css={AddToCollectionStyles.confirmButton} onClick={handleCreateCollection}>Create Collection</button>
                                <button css={AddToCollectionStyles.cancelButton} onClick={handleCreateButton}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

class AddToCollectionStyles {
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
        height:50vh;
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 10px;
    `
    static innerInnerModal = css`
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    `
    static collectionListContainer = css`
        display: flex;
        width: 100%;
        height: 90%;
        flex-direction: column;
        align-items: start;
        overflow-y: scroll;
        gap: 5px;
    `

    static title = css`
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 10px;
        margin-top: 10px;
        margin-left: 20px;
    `

    static topContainer = css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        display:flex;
        justify-content:space-between;
    `
    static  modalButtonContainer = css`
        display: flex;
        justify-content: center;
        gap:10px;
        width: 100%;
        margin-top: 10px;
    `
    
    static createForm = css`
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        width: 100%;
        gap: 5px;
    `

    static textInput = css`
        width: 80%;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #3AB0FF;
        text-align: center;
        font-size: 1rem;
    `

    static button = css`
        background-color:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        aspect-ratio:1;
        font-size:1.5rem;
        margin-right: 10px;
        padding: 0;
    `

    static confirmButton = css`
        background-color: #3AB0FF;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        border:none;
        outline:none;
        cursor:pointer;
    `

    static cancelButton = css`
        background-color: #F87474;
        padding: 10px;
        color: #fff;
        border-radius: 5px;
        border:none;
        outline:none;
        cursor:pointer;
    `
}