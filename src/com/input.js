import React from 'react'

function Input(props) {

    const sub = (e) => {
        e.preventDefault()
    }

    return (
        <div className='input'>
            <form onSubmit={(e) => sub(e)} className='search-box'>
                <input onChange={(e) => { props.setsearchTerm(e.target.value) }} className='search'></input>
            </form>
        </div>
    )
}

export default Input
