import React, { createContext, useEffect, useState } from "react";

// import request from '../src/helper/Request.js'

export const BookingContext = createContext(null);

const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([
        {
            id: 0,
            bookingDate: '2021-10-19',
            operator: 'Adam Mickiewicz',
            bookingOwner: 'Stanisław Lem',
            guest: true,
            office: 'IT3',
            desk: 'IT3.23',
            bookingStatus: true,
            statusSetDate: '',
            accept: 'Artur Akceptator',
            deleted: false,
        },
        {
            id: 1,
            bookingDate: '2021-11-28',
            operator: 'Zenon Nowak',
            bookingOwner: 'JRR Tolkien',
            guest: false,
            office: 'IT1',
            desk: 'IT1.15',
            bookingStatus: null,
            statusSetDate: '',
            accept: '',
            deleted: false,
        },
        {
            id: 2,
            bookingDate: '2021-11-15',
            operator: 'Zenon Nowak',
            bookingOwner: 'Agnieszka Hewusz',
            guest: false,
            office: 'IT2',
            desk: 'IT2.15',
            bookingStatus: false,
            statusSetDate: '',
            accept: '',
            deleted: true,
        },
        {
            id: 3,
            bookingDate: '2021-12-06',
            operator: 'Agnieszka Hewusz',
            bookingOwner: 'Agnieszka Hewusz',
            guest: false,
            office: 'IT2',
            desk: 'IT2.23',
            bookingStatus: true,
            statusSetDate: '',
            accept: '',
            deleted: false,
        },
    ]);

    const [user, setUser] = useState(
        {
            id: 0,
            operator: 'Agnieszka Hewusz',
            permissonsOfficeList: ['xxx', 'IT2', 'IT5'],
            acceptOffice: ['IT1', 'IT2'],
            defaultOffice: 'IT1',
            defaultDesk: 'IT1.1'
        },
    );

    const [allDesks, setAllDesks] = useState(
        {
            id: 0,
            office: 'IT3',
            desk: 'IT3.3'
        },
        {
            id: 1,
            office: 'IT4',
            desk: 'IT4.1'
        },
        {
            id: 2,
            office: 'IT4',
            desk: 'IT4.2'
        },
        {
            id: 3,
            office: 'IT5',
            desk: 'IT5.7'
        },
        {
            id: 4,
            office: 'IT5',
            desk: 'IT5.8'
        }
    )

    // const fetchData = async () => {
    //     const {data} = await request.get('/bookings');
    //
    //     setBookings(data.bookings);
    // };

    useEffect(() => {
        // fetchData();
    }, []);

    return (
        <BookingContext.Provider value={{
            bookings,
            setBookings,
            user,
            setUser
        }}>
            {children}
        </BookingContext.Provider>
    );

};
export default BookingProvider;