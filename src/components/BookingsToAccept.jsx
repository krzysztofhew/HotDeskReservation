import React from "react";
import { useContext } from 'react';

import { BookingContext } from "./BookingProvider";

function BookingsToAccept() {

    const { bookings, user, setBookings } = useContext(BookingContext);

    const bookingsWithAcceptOffice = bookings
        .filter(item => user.acceptOffice.includes(item.office))
        .filter(item => !item.deleted);

    console.log(bookingsWithAcceptOffice);

    // const bookingsToAccept = bookings
    //     .filter(item => item.office === user.operator);

    bookingsWithAcceptOffice.sort((a, b) => {

        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })


    const toogleAcceptHandler = (id, bookingStatus) => {
        //kopia tablicy bookings
        const newBookiengs = [...bookings];
        //wyszukanie bookingu po id
        const idx = bookings.findIndex(item => item.id === id)
        //zmiana
        const newBooking = { ...bookings[idx], bookingStatus };

        newBookiengs[idx] = newBooking;
        setBookings(newBookiengs);
    }


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
                        <th scope="col" >Akceptacja </th>
                    </tr>
                </thead>


                <tbody>
                    {bookingsWithAcceptOffice.map((item, idx) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.bookingOwner}</td>
                            <td>{item.office}</td>
                            <td>{item.desk}</td>
                            {/* <td>{item.bookingStatus == true ? <p>Oczekująca</p> : (item.bookingStatus == true ? <p>Zaakceptowana</p> : <p>Odrzucona</p>)}</td> */}
                            <td><button className='btn btn-primary' style={{ width: "100px" }} onClick={() => toogleAcceptHandler(item.id, !item.bookingStatus)}>{item.bookingStatus ? 'Odrzuć' : 'Zaakceptuj'}</button></td>

                            {/* {item.deleted == false ? <button className='btn btn-primary' onClick={() => toogleDeleteHandler(item.id, true)}>Usuń</button>
                                : <button className='btn btn-primary' onClick={() => toogleDeleteHandler(item.id, false)}>Przywróć</button>} */}
                        </tr>
                    ))}
                </tbody>


            </table>

        </>
    );
}

export default BookingsToAccept;