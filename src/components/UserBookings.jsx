import React, { useContext } from 'react';

import { BookingContext } from "./BookingProvider";

function UserBookings() {


    const { bookings, user, setBookings } = useContext(BookingContext);
    //const [deleted, setDeleted] = useState('');


    const userBookings = bookings.filter(item => item.bookingOwner === user.operator);

    userBookings.sort((a, b) => {

        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return -1
        }
        return 0
    })


    const toogleDeleteHandler = (id, deleted, bookingStatus) => {

        const newBookiengs = [...bookings];
        const idx = bookings.findIndex(item => item.id === id)
        const newBooking = { ...bookings[idx], deleted, bookingStatus };

        newBookiengs[idx] = newBooking;
        setBookings(newBookiengs);
    }


    // const handleDelete = (e) => {
    //     const { deleted } = e.target;
    //     setBooking({ deleted: true, });
    // }
    // const handleDelete = (event) => {
    //     setBooking.bookings.booking.deleted({ deleted: 'true' })
    //     return true;
    // };

    // const handleRestore = (event) => {
    //     setDeleted(event.target.value)
    //     return true;
    // };

    // const handleDesk = (event) => setDeleted(event.target.value);

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col" >Id</th>
                        <th scope="col" >Data rezerwacji</th>
                        <th scope="col" >Właściciel rezerwacji</th>
                        <th scope="col" >Nazwa biura</th>
                        <th scope="col" >Numer biurka</th>
                        <th scope="col" >Status</th>
                        <th scope="col" >Opcje</th>
                    </tr>
                </thead>
                <tbody>
                    {userBookings.map((item, idx) => (
                        <tr>
                            <th scope="row">{item.id}</th>
                            <td>{item.bookingDate}</td>
                            <td>{item.bookingOwner}</td>
                            <td>{item.office}</td>
                            <td>{item.desk}</td>
                            <td>{item.bookingStatus == null ? <p>Oczekująca</p>
                                : (item.bookingStatus == true ? <p>Zaakceptowana</p> :
                                    (item.bookingStatus == false && item.deleted == true ? <p>Usunięta</p> : <p>Odrzucona</p>))}</td>
                            {/* <td><button className='btn btn-primary' onClick={() => toogleDeleteHandler(item.id, !item.deleted)}>{item.deleted ? 'Przywróć' : 'Usuń'}</button></td> */}

                            <td> {item.deleted == false ? <button className='btn btn-primary' style={{ width: "100px" }} onClick={() => toogleDeleteHandler(item.id, true, false)}>Usuń</button>
                                : <button className='btn btn-primary' style={{ width: "100px" }} onClick={() => toogleDeleteHandler(item.id, false, null)}>Przywróć</button>}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </>
    );
}


export default UserBookings;