import React from 'react';


const Coin = (props) => {
    return (

        <div key={props.id} onClick={() => { props.setSelected(props.id) }} className={props.selected === props.id ? 'card selected' : 'card'}>

            <img className='sideBarImage' src={props.image} alt={props.name} ></img>
            <h1 className='sideBarName'>{props.symbol}</h1>
            <span className={props.grow > 0 ? 'green sideBarPrice' : 'red sideBarPrice'}>${props.price}</span>
        </div>

    );
};

export default Coin;
