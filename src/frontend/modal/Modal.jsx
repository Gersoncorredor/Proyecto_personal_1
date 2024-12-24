import React from 'react';
import './Modal.css';


const Modal = ({ isOpen, onClose, onAccept, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-header'><h2>{title}</h2></div>
        <div className='modal-body'>{children}</div>
        <div className='modal-footer'>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => {
            onAccept()
            onClose()
          }}>Aceptar</button>
        </div>
      </div>
    </div>

  );
};

export default Modal;
