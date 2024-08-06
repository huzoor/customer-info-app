import React from 'react'

const ButtonComponent = (props) => {
  return (
    <button onClick={e=> props.handleInputs(e, props.title)} {...props}> {props.desc}</button>
  )
}

export default ButtonComponent