import { useState } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

function item_annual_total_func() {
    if (this.children.length > 0) {
        const ret = this.children.reduce((sum, cur) => sum + cur.annual(), 0);
        return ret;
    } else {
        return this.annual_base;
    }
}

function get_default_expense(name, amount) {
    return {
        name: name,
        annual_base: amount,
        annual: item_annual_total_func,
        children: [],
    };
}

function numstr2_comma(num) {
    return num.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

function numstr_comma(num) {
    return num.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

const defualt_owner = [get_default_expense("Base Pay", 120000), get_default_expense("Bonuses", 0)];

const defualt_techs = [
    get_default_expense("Tech 1", 80000),
    get_default_expense("Tech 2", 80000),
    get_default_expense("Tech 3", 80000),
];

const default_office_people = [get_default_expense("Client Service Rep", 40000)];

const default_salaries = [
    {
        name: "Owner",
        annual_base: 0,
        annual: item_annual_total_func,
        children: defualt_owner,
    },
    {
        name: "Technicians",
        annual_base: 0,
        annual: item_annual_total_func,
        children: defualt_techs,
    },
    {
        name: "Office",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_office_people,
    },
];

const default_insurance = [
    get_default_expense("Owner Health", 21600),
    get_default_expense("Owner Dental/Vision", 0),
    get_default_expense("Employee Health", 48000),
    get_default_expense("Employee Dental/Vision", 0),
    get_default_expense("Auto", 8500),
    get_default_expense("Workers Comp", 12000),
    get_default_expense("General Liability", 28951),
];

const default_shop_utils = [
    get_default_expense("Rent", 36000),
    get_default_expense("Gas", 3800),
    get_default_expense("Electric", 2700),
    get_default_expense("Water/Sewer", 12000),
    get_default_expense("Dumpster", 3600),
    get_default_expense("Internet", 1440),
    get_default_expense("Phones", 7200),
];

const default_vehicles = [
    get_default_expense("Leases", 57600),
    get_default_expense("Fuel", 15600),
    get_default_expense("Maintenance", 4000),
    get_default_expense("Oil Changes", 1000),
    get_default_expense("Repairs", 4000),
    get_default_expense("Tires", 2000),
];

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
    get_default_expense("Door hangers", 0),
];

const default_professional = [
    get_default_expense("Contractor License", 2483.45),
    get_default_expense("CC Fees", 30000),
    get_default_expense("Bookkeeping", 7200),
    get_default_expense("Losses/Refunds", 8000),
    get_default_expense("Tax Preparation", 2000),
    get_default_expense("Coaching", 12000),
    get_default_expense("Google Suite", 600),
    get_default_expense("Service Titan", 3600),
    get_default_expense("Uniforms/Merch", 4000),
    get_default_expense("Replacement Tools", 6000),
    get_default_expense("Office Supplies", 2800), // Includes phone supplies
];

const DEFAULT_VEHICLES_NAME = "Vehicles";

const default_other_expenses = [
    {
        name: "Insurance",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_insurance,
    },
    {
        name: "Shop/Utilities",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_shop_utils,
    },
    {
        name: DEFAULT_VEHICLES_NAME,
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_vehicles,
    },
    {
        name: "Advertisement",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_advertising,
    },
    {
        name: "Professional",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_professional,
    },
];

function calculate_employer_taxes(salary_obj, tax_percentage) {
    const tot_salaries = salary_obj.annual();
    return (tot_salaries * tax_percentage) / 100.0;
}

const default_12_month_growth = [
    get_default_expense("Development", 20000),
    get_default_expense("Equipment", 40000),
    get_default_expense("Vehicle", 15000),
    get_default_expense("Other", 0),
];

const default_expenses = [
    {
        name: "Salaries",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_salaries,
    },
    {
        name: "Employer Taxes",
        annual_base: 0,
        annual: item_annual_total_func,
        children: [],
    },
    {
        name: "Operating",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_other_expenses,
    },
    {
        name: "12 Month Growth",
        annual_base: 0,
        annual: item_annual_total_func,
        children: default_12_month_growth,
    },
];

function find_vehicle_sub_category(operating_expenses) {
    for (let i = 0; i < operating_expenses.length; ++i) {
        console.log("Looking at name: " + operating_expenses[i].name);
        if (operating_expenses[i].name.toLowerCase().includes(DEFAULT_VEHICLES_NAME.toLowerCase())) {
            return i;
        }
    }
    return -1;
}

const SALARY_CAT_INDEX = 0;
const TAX_CAT_INDEX = 1;
const OPERATING_CAT_INDEX = 2;
const GROWTH_CAT_INDEX = 3;

function CalcInputElement({ label, type, name, value, on_update_value, step = 1 }) {
    const on_change = (e) => {
        on_update_value(Number(e.target.value));
    };
    return (
        <div className="calc-metric-input-element">
            <label className="calc-metric-input-label" for={name}>
                {label}
            </label>
            <input
                className="calc-metric-input-input"
                id={name}
                type={type}
                value={value}
                onChange={on_change}
                step={step}
            />
        </div>
    );
}

function CategoryButton({ name, value, hours_per_year, on_click, icon_class }) {
    const hourly = value / hours_per_year;
    return (
        <button className="expanding-button gray-text" onClick={on_click}>
            <ExpenseCatValue name={name} annual={value} hourly={hourly} icon_class={icon_class} />
        </button>
    );
}

function ExpenseCategoryItem({ current_obj, top_level, update_expense_cb, hours_per_year }) {
    const per_cat_func = (current_obj) => {
        return (
            <ItemOrCategory
                current_obj={current_obj}
                update_expense_cb={update_expense_cb}
                hours_per_year={hours_per_year}
            />
        );
    };

    const [expanded, set_expanded] = useState(false);
    return (
        <div className={top_level ? "top-level-expense" : "nested-expense"}>
            <CategoryButton
                name={current_obj.name}
                value={current_obj.annual()}
                hours_per_year={hours_per_year}
                on_click={() => set_expanded(!expanded)}
                icon_class={current_obj.children.length > 0 && !expanded ? "svg-expand" : "svg-collapse"}
            />
            {expanded && <div className="expense-input-group">{current_obj.children.map(per_cat_func)}</div>}
        </div>
    );
}

function ExpenseInputItem({ current_obj, update_expense_cb, hours_per_year }) {
    const on_update_annual_value = (new_val) => {
        current_obj.annual_base = new_val;
        update_expense_cb();
    };
    const on_update_monthly_value = (new_val) => {
        current_obj.annual_base = new_val * 12;
        update_expense_cb();
    };
    const on_update_hourly_value = (new_val) => {
        current_obj.annual_base = new_val * hours_per_year;
        update_expense_cb();
    };

    return (
        <div className="expense-input-element">
            <div>{current_obj.name}</div>
            <CalcInputElement
                label={"$/year"}
                type={"number"}
                value={current_obj.annual().toFixed(2)}
                on_update_value={on_update_annual_value}
                step={1000}
            />
            <CalcInputElement
                label={"$/month"}
                type={"number"}
                value={(current_obj.annual() / 12).toFixed(2)}
                on_update_value={on_update_monthly_value}
                step={1}
            />
            <CalcInputElement
                label={"$/hour"}
                type={"number"}
                value={(current_obj.annual() / hours_per_year).toFixed(2)}
                on_update_value={on_update_hourly_value}
                step={0.01}
            />
        </div>
    );
}

function ItemOrCategory({ current_obj, update_expense_cb, hours_per_year }) {
    if (current_obj.children.length > 0) {
        return (
            <ExpenseCategoryItem
                current_obj={current_obj}
                top_level={false}
                update_expense_cb={update_expense_cb}
                hours_per_year={hours_per_year}
            />
        );
    } else {
        return (
            <ExpenseInputItem
                current_obj={current_obj}
                update_expense_cb={update_expense_cb}
                hours_per_year={hours_per_year}
            />
        );
    }
}

function ExpensesCategories({ expenses, update_expense_cb, hours_per_year }) {
    const per_cat_func = (current_obj, index, arr) => {
        return (
            <ExpenseCategoryItem
                current_obj={current_obj}
                top_level={true}
                update_expense_cb={update_expense_cb}
                hours_per_year={hours_per_year}
            />
        );
    };
    return <>{expenses.map(per_cat_func)}</>;
}

function Header() {
    return (
        <div className="header gray-text">
            <h1>
                TRAINING
                <span className="yellow-text">WITH</span>JERED
            </h1>
            <h3>PLUMBING ELECTRICAL HVAC</h3>
        </div>
    );
}

function CalcTitle() {
    return <div className="calc-title white-text gray-bg">THE ULTIMATE HOURLY RATE CALCULATOR</div>;
}

function CalcMetricTotal({ label, value }) {
    return (
        <div className="calc-metric-total-element">
            <div className="calc-metric-total-label">{label}</div>
            <div className="calc-metric-total-value">{value}</div>
        </div>
    );
}

function calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent) {
    return Math.round(wd_per_year * service_vehicles * 8 * (billable_hours_percent / 100));
}

function CalcInput({
    wd_per_year,
    set_wd_per_year,
    service_vehicles,
    set_service_vehicles,
    billable_hours_percent,
    set_billable_hours_percent,
    tax_percent,
    update_tax_percent,
    desired_profit,
    update_desired_profit,
    min_hourly,
    actual_hourly,
    update_actual_hourly,
}) {
    return (
        <div className="gray-text yellow-bg">
            <CalcInputElement
                label={"Work Days Per Year"}
                type={"number"}
                name={"annual_work_days"}
                value={wd_per_year}
                on_update_value={set_wd_per_year}
            />
            <CalcInputElement
                label={"Number of Service Vehicles"}
                type={"number"}
                name={"service_vehicle_cnt"}
                value={service_vehicles}
                on_update_value={set_service_vehicles}
            />
            <CalcInputElement
                label={"Billable Hours Sold %"}
                type={"number"}
                name={"percent_sold_billable_hrs"}
                value={billable_hours_percent}
                on_update_value={set_billable_hours_percent}
            />
            <div className="calc-metric-total-wrapper">
                <CalcMetricTotal
                    label={"Annual Billable Hours"}
                    value={calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent)}
                />
            </div>
            <CalcInputElement
                label={"Employer Tax %"}
                type={"number"}
                name={"tax_percent"}
                value={tax_percent}
                on_update_value={update_tax_percent}
            />
            <CalcInputElement
                label={"Desired Profit %"}
                type={"number"}
                value={desired_profit}
                on_update_value={update_desired_profit}
            />
            <div className="calc-metric-total-wrapper">
                <CalcMetricTotal label={"Minimum Hourly Rate"} value={"$" + numstr2_comma(min_hourly)} />
            </div>
            <CalcInputElement
                label={"Actual Hourly Rate $/hr"}
                type={"number"}
                value={actual_hourly}
                on_update_value={update_actual_hourly}
            />
        </div>
    );
}

function calculate_total_expenses(expenses) {
    return expenses.reduce((sum, cur) => sum + cur.annual(), 0);
}

function ExpenseCatValue({ name, hourly, annual, icon_class = "" }) {
    return (
        <div className="cat-total-grid">
            <div className="justify-left">{name}</div>
            <div className="font-sz-sm">${numstr2_comma(hourly)}/hr</div>
            <div>${numstr_comma(annual)}</div>
            <div className={"icon " + icon_class} />
        </div>
    );
}

function HoursReqCatValue({ name, daily, weekly, extra_style = "summary-item-padding" }) {
    return (
        <div className={"cat-total-grid " + extra_style}>
            <div className="justify-left">{name}</div>
            <div>{daily}</div>
            <div>{weekly}</div>
            <div className={"icon"} />
        </div>
    );
}

function TotalsCatValue({ name, total }) {
    return (
        <div className={"total-grid"}>
            <div className="justify-left">{name}</div>
            <div>${numstr_comma(total)}</div>
            <div className={"icon"} />
        </div>
    );
}

function Expenses({ expenses, update_expense_cb, hours_per_year, tot_expenses, tot_per_hr_expense }) {
    return (
        <>
            <div className="calc-section white-text gray-bg">
                <ExpenseCatValue name={"EXPENSES"} hourly={tot_per_hr_expense} annual={tot_expenses} />
            </div>
            <div className="gray-text yellow-bg expense-section">
                <ExpensesCategories
                    expenses={expenses}
                    update_expense_cb={update_expense_cb}
                    hours_per_year={hours_per_year}
                />
            </div>
        </>
    );
}

function ProfitSummary({ actual_hourly_rate, work_days_per_year, tot_expenses }) {
    const min_daily_exp = tot_expenses / work_days_per_year;
    const exp_daily = min_daily_exp / actual_hourly_rate;
    const pft10_daily = min_daily_exp / (actual_hourly_rate * 0.9);
    const pft20_daily = min_daily_exp / (actual_hourly_rate * 0.8);
    const pft30_daily = min_daily_exp / (actual_hourly_rate * 0.7);

    return (
        <>
            <div className="calc-section white-text gray-bg">
                <HoursReqCatValue name={"HOURS REQUIRED AT $" + actual_hourly_rate.toFixed(2) + "/hr"} daily={"DAILY"} weekly={"WEEKLY"} extra_style={""} />
            </div>
            <div className="gray-text yellow-bg summary-section">
                <HoursReqCatValue
                    name={"Expenses"}
                    daily={exp_daily.toFixed(2) + " hrs"}
                    weekly={(exp_daily * 5).toFixed(2) + " hrs"}
                />
                <HoursReqCatValue
                    name={"10% Profit"}
                    daily={pft10_daily.toFixed(2) + " hrs"}
                    weekly={(pft10_daily * 5).toFixed(2) + " hrs"}
                />
                <HoursReqCatValue
                    name={"20% Profit"}
                    daily={pft20_daily.toFixed(2) + " hrs"}
                    weekly={(pft20_daily * 5).toFixed(2) + " hrs"}
                />
                <HoursReqCatValue
                    name={"30% Profit"}
                    daily={pft30_daily.toFixed(2) + " hrs"}
                    weekly={(pft30_daily * 5).toFixed(2) + " hrs"}
                />
            </div>
        </>
    );
}

function FinalTotal({ actual_hourly_rate, total_billable_hours }) {
    //=((E31*0.9)*C10)/0.75
    const total_revenue = actual_hourly_rate * total_billable_hours * 0.9 / 0.75
    const break_even_revenue = total_revenue * 0.8;
    const break_even_monthly_revenue = break_even_revenue / 12;
    return (
        <div className="calc-section white-text gray-bg">
            <TotalsCatValue name={"ANNUAL REVENUE"} total={total_revenue} />
            <TotalsCatValue name={"ANNUAL BREAK EVEN REVENUE"} total={break_even_revenue} />
            <TotalsCatValue name={"MONTHLY BREAK EVEN REVENUE"} total={break_even_monthly_revenue} />
        </div>
    );
}

function RateCalc() {
    const [expenses, set_expenses] = useState(default_expenses);
    const [wd_per_year, set_wd_per_year] = useState(260);
    const [service_vehicles, set_service_vehicles] = useState(3);
    const [billable_hours_percent, set_billable_hours_percent] = useState(55);
    const [tax_percent, set_tax_percent] = useState(10);
    const [desired_profit, set_desired_profit] = useState(30);

    expenses[TAX_CAT_INDEX].annual_base = calculate_employer_taxes(expenses[SALARY_CAT_INDEX], tax_percent);
    const billable_hrs = calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent);
    const tot_expenses = calculate_total_expenses(expenses);
    const tot_per_hr_expense = tot_expenses / billable_hrs;
    const min_hourly = (tot_per_hr_expense / (100 - desired_profit)) * 100;

    const [actual_hourly, set_actual_hourly] = useState(Math.round(min_hourly * 1.05));

    const update_expenses = () => {
        set_expenses([...expenses]);
    };

    // Update each item in the vehicle sub category of operating expenses to reflect the new number of service vehicles
    const update_service_vehicles = (new_val) => {
        const vehicle_sub_cat = find_vehicle_sub_category(expenses[OPERATING_CAT_INDEX].children);
        if (vehicle_sub_cat != -1) {
            // Divide annual expenses by current service vehicle number to get each expense per vehicle, then multiply by the new service vehicle number
            expenses[OPERATING_CAT_INDEX].children[vehicle_sub_cat].children.map((cur_exp) => {
                const cur_annual_per_vehicle = cur_exp.annual() / service_vehicles;
                cur_exp.annual_base = cur_annual_per_vehicle * new_val;
            });
        } else {
            console.log("Vehicle operating sub category has been removed");
        }
        set_service_vehicles(new_val);
        set_expenses([...expenses]);
    };

    const update_tax_percent = (new_val) => {
        set_tax_percent(new_val);
        update_expenses();
    };

    const update_desired_profit = (new_val) => {
        const billable_hrs = calculate_billable_hours(wd_per_year, service_vehicles, billable_hours_percent);
        const tot_expenses = calculate_total_expenses(expenses);
        const tot_per_hr_expense = tot_expenses / billable_hrs;
        const min_hourly = (tot_per_hr_expense / (100 - new_val)) * 100;
        set_actual_hourly(Math.round(min_hourly * 1.05));
        set_desired_profit(new_val);
    };

    return (
        <div className="calc-body">
            <CalcTitle />
            <CalcInput
                wd_per_year={wd_per_year}
                set_wd_per_year={set_wd_per_year}
                service_vehicles={service_vehicles}
                set_service_vehicles={update_service_vehicles}
                billable_hours_percent={billable_hours_percent}
                set_billable_hours_percent={set_billable_hours_percent}
                tax_percent={tax_percent}
                update_tax_percent={update_tax_percent}
                desired_profit={desired_profit}
                update_desired_profit={update_desired_profit}
                min_hourly={min_hourly}
                actual_hourly={actual_hourly}
                update_actual_hourly={set_actual_hourly}
            />
            <Expenses
                expenses={expenses}
                update_expense_cb={update_expenses}
                hours_per_year={billable_hrs}
                tot_expenses={tot_expenses}
                tot_per_hr_expense={tot_per_hr_expense}
            />
            <ProfitSummary
                actual_hourly_rate={actual_hourly}
                work_days_per_year={wd_per_year}
                tot_expenses={tot_expenses}
            />
            <FinalTotal actual_hourly_rate={actual_hourly} total_billable_hours={billable_hrs} />
        </div>
    );
}

function App() {
    return (
        <>
            <Header />
            <RateCalc />
        </>
    );
}

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>
);
