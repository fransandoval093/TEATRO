import React from 'react'
import './Model.css'
import { MdCancel } from 'react-icons/md';


function Model({ open, children, onClose}) {
    if(!open) return null
    return (
        <div className="popup">
            <button onClick= {onClose}><MdCancel size="3em"/></button>
            {children}
        </div>
    )
}

export default Model
