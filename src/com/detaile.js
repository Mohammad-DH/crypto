import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ChartFile from '../market_chart.json'
import Loading from './Loading';
import Chart from './chart';

function Detaile(props) {
    const [coins, setcoins] = useState([{ id: 'loading' }])
    const [chart, setchart] = useState(ChartFile)
    const [localTime, setlocalTime] = useState('')
    const [loading, setloading] = useState(false)

    const setLocalTime = () => {
        setlocalTime(new Date().toLocaleTimeString())

    }
    setInterval(() => {
        setLocalTime()
    }, 1000);


    useEffect(() => {
        setcoins(props.coins)
    }, [props.coins])


    useEffect(() => {
        setloading(true)
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${props.show}/market_chart?vs_currency=usd&days=1`
            )
            .then(res => {
                setchart(res.data);
                setloading(false)
            })
            .catch(error => { console.log(error + '***') });
    }, [props.show]);

    return (
        <div className='R-side'>
            <div className='time'>
                <h3> {localTime}</h3>


            </div>
            <div className="comp">
                <div className='chart'>
                    {loading === true ? <Loading /> : <Chart data={chart.prices} name={props.show} />}
                </div>
                <div className='detaile'>
                    {coins.map(coin => {

                        return (
                            <div className={coin.id === props.show ? 'display' : 'not-display'}>
                                <h2 className='detaile-name'>{coin.name}</h2>

                                <div className='mainDetaile'>
                                    <div className='mainDetaile-C1'>

                                        <h4>Price : ${coin.current_price}</h4>
                                        <h4>High/Low : $ {coin.high_24h}/{coin.low_24h}</h4>
                                        <h4 className={coin.price_change_24h > 0 ? 'green' : 'red'} >Change :{coin.price_change_24h}</h4>
                                        <h4 className={coin.price_change_percentage_24h > 0 ? 'green' : 'red'}>%{String(coin.price_change_percentage_24h).slice(4)}</h4>

                                    </div>
                                    <div className='mainDetaile-C2'>
                                        <h4>Market cap :{coin.market_cap}</h4>
                                        <h4 className={coin.market_cap_change_24h > 0 ? 'green' : 'red'}>Change :{coin.market_cap_change_24h}</h4>
                                        <h4 className={coin.market_cap_change_percentage_24h > 0 ? 'green' : 'red'} >%{String(coin.market_cap_change_percentage_24h).slice(4)}</h4>
                                    </div>
                                    <div className='mainDetaile-C2'>
                                        <h4>Volume :{coin.total_volume}</h4>
                                    </div>

                                </div>
                            </div>

                        );
                    })}
                </div>

            </div>


        </div >
    )
}

export default Detaile
