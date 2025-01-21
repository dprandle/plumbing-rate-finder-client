import { useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'

function Header() {
    return (
        <div className="header gray-text">
            <h1>TRAINING<span className="yellow-text">WITH</span>JERED</h1>
            <h3>PLUMBING ELECTRICAL HVAC</h3>
        </div>
    )
}

function CalcTitle() {
    return (
        <div className="calc-title white-text gray-bg">THE ULTIMATE HOURLY RATE CALCULATOR</div>
    )
}

function CalcMetricTotal({ label, value }) {
    return (
        <div className="calc-metric-total-element">
            <div className="calc-metric-total-label">{label}</div>
            <div className="calc-metric-total-value">{value}</div>
        </div>
    )
}

function CalcMetricInputElement({ label, type, name, placeholder }) {
    return (
        <div className="calc-metric-input-element">
            <label className="calc-metric-input-label" for={name}>{label}</label>
            <input className="calc-metric-input-input" id={name} type={type} placeholder={placeholder} />
        </div>
    )
}

function CalcInput() {
    return (
        <div className="gray-text yellow-bg">
            <CalcMetricInputElement label={"Work Days Per Year"} type={"number"} name={"annual_work_days"} placeholder={260} />
            <CalcMetricInputElement label={"Number of Service Vehicles"} type={"number"} name={"service_vehicle_cnt"} placeholder={1} />
            <CalcMetricInputElement label={"% Billable Hours Sold (55% is standard)"} type={"number"} name={"percent_sold_billable_hrs"} placeholder={55} />
            <div className="calc-metric-total-wrapper">
                <CalcMetricTotal label={"Annual Billable Hours"} value={3432} />
            </div>
        </div>
    )
}


function Expenses() {
    return (
        <h2>Operating Expenses</h2>
    )
}

function RateCalc() {
    return (
        <div className="calc-body">
            <CalcTitle />
            <CalcInput />
            <Expenses />
        </div>
    )
}

function App() {
    return (
        <>
            <Header />
            <RateCalc />
        </>
    )
}


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

