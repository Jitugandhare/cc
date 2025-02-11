import React from 'react'
import "./styles.css";

const Dialog = ({ onClose, children }) => {
  return (
    <div className='dialog'>
      <div className='dialog-background'>
        <div className='dialogcontent'>{children}</div>
      </div>
    </div>
  )
}

export default Dialog