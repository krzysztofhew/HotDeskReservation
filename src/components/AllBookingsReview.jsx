import React, { useContext } from 'react';

import { BookingContext } from "./BookingProvider";

function AllBookingsReview() {

    const { bookings } = useContext(BookingContext);

    const accepted = bookings.filter(item => item.bookingStatus);

    accepted.sort((a, b) => {

        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Data rezerwacji</th>
                        <th scope="col">Właściciel rezerwacji</th>
                        <th scope="col" >Nazwa biura</th>
                        <th scope="col" >Numer biurka</th>

                    </tr>
                </thead>
                <tbody>
                    {accepted.map((item) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.bookingOwner}</td>
                            <td>{item.office}</td>
                            <td>{item.desk}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}

export default AllBookingsReview;