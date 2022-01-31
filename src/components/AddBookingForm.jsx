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

const AddBookingForm = ({ handleOnClose, isModalOpen }) => {

    const [bookingOwner, setBookingOwner] = useState('');
    const [guest, setGuest] = useState('false');
    const [bookingDate, setBookingDate] = useState('');
    const [office, setOffice] = useState('');
    const [desk, setDesk] = useState('');

    const { bookings, user, allDesks, setBookings } = useContext(BookingContext);

    const imgUrl = office && `IMAGES.${office}`;
    const img = `IMAGES.${office}`;

    //const imgUrl = office && 'src\img\${office}.jpg';

    const officess = user.permissonsOfficeList
        .map(item => item)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    const desksFromOffice = desks
        .filter((v, i, a) => v.office === office)
        .map(item => item.desk)
        .filter((v, i, a) => a.indexOf(v) === i)
        .map(item => ({ id: item, label: item }));

    const [validateMessage, setValidateMessage] = useState('Dodano rezerwację');

    const validateMessageComponent = validateMessage.length ? <p>{validateMessage}</p> : null;

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
        const newBooking = {
            id: 4 ,
            bookingDate: bookingDate,
            operator: user.operator,
            bookingOwner: bookingOwner,
            guest: guest,
            office: office,
            desk: desk,
            bookingStatus: null,
            statusSetDate: '',
            accept: '',
            deleted: false,
        }
        setBookings([...bookings, newBooking]);
        // setBookings(event.target.value);
        resetStateOfInputs();
        handleOnClose();
    }
console.log(bookings);

    //TODO tu dodać domyślne wartości
    const resetStateOfInputs = () => {
        setBookingOwner(user.operator);
        setGuest('');
        setBookingDate('');
        setOffice(user.defaultOffice);
        setDesk(user.defaultDesk);
        setValidateMessage('');
    }
    useEffect(() => {
        if (isModalOpen) {
            resetStateOfInputs();
        }
    }, [isModalOpen])


    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOnOutsideClick={true}>
            {validateMessageComponent}
            {/*<form method="post" onSubmit={true}>*/}
            <form onSubmit={true}>
                <div className='modal-header ng-scope'>
                    Dodaj rezerwację
                </div>
                <div className='modal-body'>
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
                        <label className='col-md-5' htmlFor="office">Wybierz biurko </label>
                        <Select className='col-md-5' value={office} id="office" onChange={handleOffice} options={officess} />
                        <label className='col-md-1' htmlFor="desk">  </label>
                        <Select className='col-md-5' value={desk} id="desk" onChange={handleDesk} options={desksFromOffice} />
                    </div>
                    <br />

                    <p>
                        <img src={IMAGES.IT3} alt="rzut" style={{ width: "100px" }} /></p>
                </div>


                <div className='modal-footer ng-scope'>
                    <button type="submit" className='btn btn-primary' onClick={handleOnSubmit}>Zapisz</button>
                    <button type="button" className='btn btn-warning' onClick={handleOnCloseModal}>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddBookingForm;