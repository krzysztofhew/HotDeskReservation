import React from "react";
import { useContext } from 'react';

import { BookingContext } from "./BookingProvider";

function User() {

    const user = useContext(BookingContext);

    return (
        <div className='breadcrumb ng-scope'>Hot Desk / {user.user.operator}</div>
    );
}
export default User;