import React from 'react'
import './Model.css'
import { GiCancel } from 'react-icons/gi';


function Model({ open, children, onClose}) {
    if(!open) return null
    return (
        <div className="popup">
            <button  onClick= {onClose}><GiCancel size="2em" color="#D01926" /></button>
            {children}
        </div>
    )
}

export default Model
