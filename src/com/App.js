import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './media.css';
import Coin from './coin';
import api from '../crypto.json'
import Input from './input';
import Detaile from './detaile';
import Loading from './Loading';


function App() {
    const [coins, setCoins] = useState(api);
    const [Selected, setSelected] = useState('bitcoin');
    const [searchTerm, setsearchTerm] = useState("")
    const [loading, setloading] = useState(false)
    const [Toggle, setToggle] = useState(false)

    const setselected = (i) => {
        setSelected(i)
    }
    const SETsearchTerm = (i) => {
        setsearchTerm(i)
    }


    useEffect(() => {
        setloading(true)
        axios
            .get(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            )
            .then(res => {
                setCoins(res.data);
                console.log(res.data)
                setloading(false)
            })
            .catch(error => { console.log(error + '***') });
    }, []);

    const Filter = (val) => {

        if (searchTerm === "") {
            return val

        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val

        }

    }

    return (
        <div className='main'>
            <div className={Toggle === false ? 'L-side comeout' : 'L-side comein'}>

                <Input setsearchTerm={SETsearchTerm} />

                <div className='side-bar'>
                    {loading === true ? <Loading /> :

                        coins.filter(Filter).map(coin => {
                            return (
                                <Coin
                                    setSelected={setselected}
                                    selected={Selected}
                                    id={coin.id}
                                    price={coin.current_price}
                                    symbol={coin.symbol}
                                    image={coin.image}
                                    grow={coin.price_change_percentage_24h}

                                />
                            );
                        })

                    }

                </div>
            </div>
            <Detaile
                show={Selected}
                coins={coins}
            />
            <div onClick={() => setToggle(false)} className={Toggle === true ? 'toggle' : 'not-display'}><span>Z</span></div>
            <div onClick={() => setToggle(true)} className={Toggle === true ? 'not-display' : 'toggle'}><span>X</span></div>

        </div>

    );
}

export default App;
