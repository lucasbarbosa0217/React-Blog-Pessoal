import React, { FormEventHandler, MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
  children : ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onSubmit?: FormEventHandler<HTMLButtonElement>;
  onDoubleClick?: MouseEventHandler<HTMLButtonElement>;

}

function Button({children, onClick, onDoubleClick, onSubmit} : ButtonProps) {
  return (
    <button onClick={onClick} onDoubleClick={onDoubleClick} onSubmit={onSubmit}
    className='bg-light-accent p-2 text-dark-textContent hover:bg-light-accentSelected active:bg-light-accentActive'
    >{children}</button>
  )
}

export default Button