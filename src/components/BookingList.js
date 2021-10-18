import React from 'react';
import Booking from './Booking';
import '../styles/BookingTable.css';



const BookingList = (props) => {
    //*TODO wyswietlac tylko przyszle rezerwacje 
    const widthMin = {
        width: '15%'
    }
    const widthMax = {
        width: '40%'
    }

    const accepted = props.bookings.filter(
        booking => booking.bookingStatus);

    accepted.sort((a, b) => {
        if (b.bookingDate > a.bookingDate) {
            return 1
        }
        if (b.bookingDate < a.bookingDate) {
            return - 1
        }
        return 0
    })


    const toAccept = props.bookings.filter(
        booking => booking.bookingStatus === null);

    if (toAccept.length >= 2) {
        toAccept.sort((a, b) => {
            if (a.bookingDate > b.bookingDate) {
                return 1
            }
            if (a.bookingDate < b.bookingDate) {
                return - 1
            }
            return 0
        })
    }

    const acceptedBookings = accepted.map(booking => <Booking key={booking.id} deleted={booking.deleted}
        booking={booking} accept={props.accept} refuse={props.refuse} delete={props.delete} />);

    const bookingsToAccept = toAccept.map(booking => <Booking key={booking.id} deleted={booking.deleted}
        booking={booking} accept={props.accept} refuse={props.refuse} delete={props.delete} />);


    return (
        <>
            <div className="bookingListToAccept">
                <h4 className="headerTable">Rezerwacje przekazane do akceptacji</h4>
                <table className='bookingTable'>

                    <tr className="firstRow">
                        <td style={widthMin}>Data rezerwacji</td>
                        <td style={widthMax}>Właściciel rezerwacji</td>
                        <td style={widthMin}>Nazwa biura</td>
                        <td style={widthMin}>Numer biurka</td>
                        <td style={widthMin}>Opcje</td>

                    </tr>

                </table>
                {bookingsToAccept.length > 0 ? bookingsToAccept : <p>Wszystkie rezerwacje zostały zaakceptowane</p>}
            </div>
            <hr />
            <div className="bookingListAccepted">
                <h4 className="headerTable">Zaakceptowane rezerwacje</h4>
                {acceptedBookings}

            </div>
            <hr />
        </>


    );
}

export default BookingList;