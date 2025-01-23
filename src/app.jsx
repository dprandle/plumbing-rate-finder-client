import { useState } from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'

function item_annual_total_func() {
    if (this.children.length > 0) {
        const ret = this.children.reduce((sum, cur) => sum + cur.annual(), 0);
        return ret;
    }
    else {
        return this.annual_base;
    }
}

function get_default_expense(name, amount) {
    return {
        name: name,
        annual_base: amount,
        annual: item_annual_total_func,
        children: []
    }
}

const defualt_techs = [
    get_default_expense("Tech 1", 80000),
    get_default_expense("Tech 2", 80000),
    get_default_expense("Tech 3", 80000)
]

const default_office_people = [
    get_default_expense("Client Service Rep", 40000)
]

const default_salaries = [
    get_default_expense("Owner", 120000),
    {
        name: "Technicians",
        annual_base: 0,
        annual: item_annual_total_func,
        children: defualt_techs
    },
    {
        name: "Office",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_office_people
    }
]

const default_insurance = [
    get_default_expense("Owner Health", 21600),
    get_default_expense("Owner Dental/Vision", 0),
    get_default_expense("Employee Health", 48000),
    get_default_expense("Employee Dental/Vision", 0),
    get_default_expense("Auto", 8500),
    get_default_expense("Workers Comp", 12000),
    get_default_expense("General Liability", 28951),
]

const default_shop_utils = [
    get_default_expense("Rent", 3000),
    get_default_expense("Gas", 3800),
    get_default_expense("Water/Sewer", 12000),
    get_default_expense("Dumpster", 3600),
    get_default_expense("Internet", 1440),
    get_default_expense("Phones", 7200)
]

const default_vehicles = [
    get_default_expense("Leases", 57600),
    get_default_expense("Fuel", 15600),
    get_default_expense("Maintenance", 4000),
    get_default_expense("Oil Changes", 1000),
    get_default_expense("Repairs", 4000),
    get_default_expense("Tires", 2000)
]

const default_advertising = [
    get_default_expense("Google Ads", 60000),
    get_default_expense("Facebook/Instagram", 24000),
    get_default_expense("Tik Tok", 0),
    get_default_expense("You Tube", 0),
    get_default_expense("Snap Chat", 0),
    get_default_expense("GLSA", 24000),
    get_default_expense("Geofencing", 0),
    get_default_expense("Hosting", 0),
    get_default_expense("SEO", 6000),
    get_default_expense("Call Rail", 0),
    get_default_expense("Google video buy", 0),
    get_default_expense("Marketing Company", 36000),
    get_default_expense("Retargeting", 6000),
    get_default_expense("Radio", 0),
    get_default_expense("Television", 0),
    get_default_expense("News", 0),
    get_default_expense("Home Show", 2000),
    get_default_expense("Direct Mail", 0),
    get_default_expense("Yard signs", 0),
    get_default_expense("Door hangers", 0)
]


const default_professional = [
    get_default_expense("Contractor License", 2485),
    get_default_expense("Bookkeeping", 7200),
    get_default_expense("Tax Preparation", 2000),
    get_default_expense("Coaching", 12000),
    get_default_expense("Google Suite", 600),
    get_default_expense("Service Titan", 3600),
    get_default_expense("Uniforms/Merch", 4000),
    get_default_expense("Replacement Tools", 6000),
    get_default_expense("Office Supplies", 7200)
]


const default_other_expenses = [
    {
        name: "Insurance",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_insurance
    },
    {
        name: "Shop/Utilities",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_shop_utils
    },
    {
        name: "Vehicles",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_vehicles
    },
    {
        name: "Advertisement",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_advertising
    },
    {
        name: "Professional",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_professional
    }
]

function calculate_employer_taxes(salary_obj, tax_percentage) {
    const tot_salaries = salary_obj.annual();
    return tot_salaries * tax_percentage / 100.0;
}

const default_expenses = [
    {
        name: "Salaries",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_salaries
    },
    {
        name: "Employer Taxes",
        percent: 10
    },
    {
        name: "Other Expenses",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_other_expenses
    }
]

function CalcInputElement({ label, type, name, value, on_update_value }) {
    const on_change = (e) => {
        on_update_value(Number(e.target.value));
    }
    return (
        <div className="calc-metric-input-element">
            <label className="calc-metric-input-label" for={name}>{label}</label>
            <input className="calc-metric-input-input" id={name} type={type} value={value} onChange={on_change} />
        </div>
    )
}

function CategoryButton({ name, value, cat_button_style_obj }) {
    return <button className="expanding-button gray-text" style={cat_button_style_obj}><div>{name}</div><div>${value}</div></button>
}

function ExpenseCategoryItem({ current_obj, top_level, current_obj_arr, update_expense_cb }) {
    const cat_button_style_obj = {
        fontSize: (top_level) ? '1.2em' : '1em',
        color: (top_level) ? 'white' : 'inherit',
        backgroundColor: (top_level) ? '#323232' : 'inherit',
        borderTop: (top_level) ? '4px solid #323232' : 'inherit',

    };

    const per_cat_func = (current_obj, index, arr) => {
        return (
            <ItemOrCategory current_obj={current_obj} current_obj_arr={arr} update_expense_cb={update_expense_cb} />
        );
    };

    const draw_func = () => {
        return (
            <div className={(top_level) ? "top-level-expense" : "nested-expense"}>
                <CategoryButton name={current_obj.name} value={current_obj.annual()} cat_button_style_obj={cat_button_style_obj} />
                {(top_level) ? current_obj.children.map(per_cat_func) : <div className="expense-input-group">{current_obj.children.map(per_cat_func)}</div>}
            </div>
        );
    };

    const draw_tax_func = () => {
        return (
            <div className={"top-level-expense"}>
                <CategoryButton name={current_obj.name} value={calculate_employer_taxes(current_obj_arr[0], current_obj.percent)} cat_button_style_obj={cat_button_style_obj} />
            </div>
        );
    };

    if (top_level && current_obj.name === "Employer Taxes") {
        return draw_tax_func();
    }
    else {
        return draw_func();
    }
}

function ExpenseInputItem({ current_obj, update_expense_cb }) {
    const on_update_value = (new_val) => {
        current_obj.annual_base = new_val;
        update_expense_cb();
    }
    return <CalcInputElement label={current_obj.name} type={'number'} name={current_obj.name} value={current_obj.annual()} on_update_value={on_update_value} />
}

function ItemOrCategory({ current_obj, current_obj_arr, update_expense_cb }) {
    if (current_obj.children.length > 0) {
        return <ExpenseCategoryItem current_obj={current_obj} top_level={false} current_obj_arr={current_obj_arr} update_expense_cb={update_expense_cb} />
    }
    else {
        return <ExpenseInputItem current_obj={current_obj} update_expense_cb={update_expense_cb} />
    }
}

function ExpensesCategories({ expenses, update_expense_cb }) {
    let per_cat_func = (current_obj, index, arr) => {
        return (
            <ExpenseCategoryItem current_obj={current_obj} top_level={true} current_obj_arr={arr} update_expense_cb={update_expense_cb} />
        );
    };
    return (
        <>
            {expenses.map(per_cat_func)}
        </>
    )
}

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

function calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent) {
    return Math.round(wd_per_year * service_vehicles * 8 * (billable_hours_percent / 100));
}

function CalcInput() {
    const [wd_per_year, set_wd_per_year] = useState(260);
    const [service_vehicles, set_service_vehicles] = useState(3);
    const [billable_hours_percent, set_billable_hours_percent] = useState(55);

    return (
        <div className="gray-text yellow-bg">
            <CalcInputElement label={"Work Days Per Year"} type={"number"} name={"annual_work_days"} value={wd_per_year} on_update_value={set_wd_per_year} />
            <CalcInputElement label={"Number of Service Vehicles"} type={"number"} name={"service_vehicle_cnt"} value={service_vehicles} on_update_value={set_service_vehicles} />
            <CalcInputElement label={"% Billable Hours Sold (55% is standard)"} type={"number"} name={"percent_sold_billable_hrs"} value={billable_hours_percent} on_update_value={set_billable_hours_percent} />
            <div className="calc-metric-total-wrapper">
                <CalcMetricTotal label={"Annual Billable Hours"} value={calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent)} />
            </div>
        </div>
    )
}


function Expenses({ expenses, update_expense_cb }) {
    return (
        <div className="gray-bg">
            <div className="calc-section white-text gray-bg">OPERATING EXPENSES</div>
            <div className="gray-text yellow-bg expense-section">
                <ExpensesCategories expenses={expenses} update_expense_cb={update_expense_cb} />
            </div>
        </div>
    )
}

function RateCalc() {
    const [expenses, set_expenses] = useState(default_expenses);

    const update_expense = () => {
        set_expenses([...expenses]);
    };
    
    return (
        <div className="calc-body">
            <CalcTitle />
            <CalcInput />
            <Expenses expenses={expenses} update_expense_cb={update_expense} />
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

