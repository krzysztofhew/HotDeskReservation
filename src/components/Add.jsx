import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { BookingContext } from "./BookingProvider";
import Select from "./Select";
import IMAGES from '../img/index.js'

const desks = [
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
]

const Add = ({ handleOnClose, isModalOpen }) => {

    const [bookingOwner, setBookingOwner] = useState('');
    const [guest, setGuest] = useState('false');
    const [bookingDate, setBookingDate] = useState('');
    const [office, setOffice] = useState('');
    const [desk, setDesk] = useState('');

    const { bookings, user, allDesks, setBookings } = useContext(BookingContext);

    // const imgUrl = office && `IMAGES.${office}`;
    const img = `IMAGES.${office}`;

    //const imgUrl = office && 'src\img\${office}.jpg';

    //state desks wyciagam office 
    const officess = user.permissonsOfficeList
        .map(item => item)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    //TODO zmienic zeby deski byly tylko wybranego wyzej offica
    const desksFromOffice = desks
        .filter((v, i, a) => v.office === office)
        .map(item => item.desk)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    console.log(desks);


    // const [validateMessage, setValidateMessage] = useState('Dodano rezerwację');

    // const validateMessageComponent = validateMessage.length ? <p>{validateMessage}</p> : null;

    const handleBookingOwner = (event) => setBookingOwner(event.target.value);
    const handleCheckbox = (event) => setGuest(event.target.value);
    const handleDate = (event) => setBookingDate(event.target.value);
    const handleOffice = (event) => setOffice(event.target.value);
    const handleDesk = (event) => setDesk(event.target.value);
    const handleOnCloseModal = (event) => {
        event.preventDefault();
        handleOnClose();
    }

    // const handleOnSubmit = async event => {
    //     event.preventDefault();
    //     const { data, status } = await request.post('/bookings',
    //         {bookingOwner, guest, bookingDate, office, desk}
    //     );
    //     if(status === 200) {}
    //     setBooking(data.booking);
    // }

    const handleOnSubmit = (event) => {
        setBookings(event.target.value);
        resetStateOfInputs();
        handleOnClose();
        return true;
    }

    //TODO tu dodać domyślne wartości
    const resetStateOfInputs = () => {
        setBookingOwner(user.operator);
        setGuest('');
        setBookingDate('');
        setOffice('');
        setDesk('');
        // setValidateMessage('');
    }
    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs();
        }
    }, [isModalOpen])


    return (

        <form onSubmit={true}>
            <div >
                Dodaj rezerwację
            </div>
            <div >
                <div className='col-md-12'>
                    <label className='col-md-5' htmlFor="user">Podaj użytkownika </label>
                    <input className='col-md-5' type="text" placeholder={'imię i nazwisko'} value={bookingOwner} id="user"
                        onChange={handleBookingOwner} />
                    {/* <div className='col-md-10'> */}
                    <input className='col-md-1' type="checkbox" guest={guest} id="user" onClick={handleCheckbox} />
                    <label className='col-md-1' htmlFor="user"> Gość</label>
                    {/* </div> */}
                </div>
                <br />
                <div className='col-md-12'>
                    <label className='col-md-5' htmlFor="date">Podaj datę </label>
                    <input className='col-md-5' type="date" value={bookingDate} onChange={handleDate} />
                </div>
                <br />
                <div className='col-md-12'>
                    <label className='col-md-5' htmlFor="office">Wybierz pomieszczenie </label>
                    <Select className='col-md-5' value={office} id="office" onChange={handleOffice} options={officess} />
                    <label className='col-md-1' >  </label>
                    <label className='col-md-2' htmlFor="desk"> Wybierz biurko </label>
                    <Select className='col-md-5' value={desk} id="desk" onChange={handleDesk} options={desksFromOffice} />
                </div>
                <br />

                <p>
                    <img style={{ width: "100px" }} src={img} alt="rzut" /></p>
            </div>


            <div >
                <button type="submit" className='btn btn-primary' onClick={handleOnSubmit}>Zapisz</button>
                <button type="button" className='btn btn-warning' onClick={handleOnCloseModal}>Anuluj</button>
            </div>
        </form>

    );
};

export default Add;