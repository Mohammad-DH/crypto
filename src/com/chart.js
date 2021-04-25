import React, { useState } from 'react'
import Chart from "react-apexcharts";


function CHART(props) {

    const [data1, setdata1] = useState(props.data.map((el) => [el[0]]))
    const [data2, setdata2] = useState(props.data.map((el) => el[1].toFixed(1)))

    const [state, setstate] = useState({
        options: {
            tooltip: {
                y: {
                    formatter: function (value, { }) {
                        return value
                    }
                }
            },
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                labels: {
                    format: 'dd/MM',
                },
                categories: data1.map((e) => { return new Date(e[0]).toString().slice(3, 21) }),

            }

        },
        series: [
            {
                name: `${props.name}`,
                data: data2
            }
        ]
    })
    //console.log(data1.map((e) => { return new Date(e[0]).toString() }))


    return (

        <Chart
            options={state.options}
            series={state.series}
            width="98%"
        />

    );
}
export default CHART



