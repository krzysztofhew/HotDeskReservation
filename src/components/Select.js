import React from "react";

const Select = (props) => {

    const options = [];
    for (let i = 0; i < props.options.length; i++) {
        const value = props.options[i];
        const option = <option value={value.id}>{value.label}</option>;
        options.push(option);
    }


    return (

        <select className="ng-pristine ng-valid" value={props.value} id={props.id}
            onChange={props.onChange}>
            <option value="">---</option>
            {options}
        </select>
    );
}

export default Select;