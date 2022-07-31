import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProfil } from '../../actions/user.actions';

const DeleteProfil = (props) => {
    const dispatch = useDispatch();
    const deleteUser = () => dispatch(deleteProfil(props.id))
    return (
        <button onClick={() => {
            if (window.confirm('Voulez-vous supprimer votre profil ? ')) {
                deleteUser();
                localStorage.clear();
                
            }
        }}
        >
        
                 Supprimer le profil
            
        </button>
    );
};

export default DeleteProfil;