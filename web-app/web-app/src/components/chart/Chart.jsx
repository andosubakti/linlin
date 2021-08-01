import "./chart.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Chart({tittle, data, dataKey, grid}) {
    return (
        <div className="chart">
            <h3 className="chartTittle">{tittle}</h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="id" stroke = "#5550bd"/>
                    <Line type ="monotone" dataKey={dataKey} stroke = "#5550bd"/>
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
                    <Legend />  
                    <YAxis/>              
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
