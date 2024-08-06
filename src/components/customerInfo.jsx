import React from 'react'

const CustomerInfoComponent = (props) => {
    return <>
        {props && props.contractIds
            && <div>{Object.keys(props.contractIds).map(item => <div key={item}>
                <h3> for {item}</h3>
                <ul>
                    {props.contractIds[item].map(citem => <li key={citem} >{citem}</li>)}
                </ul>
            </div>)}</div>
        }
    </>
}

export default CustomerInfoComponent