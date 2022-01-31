import React, { useState } from "react";
import { BsCalendarPlus, BsFillPersonFill, BsCalendarCheck, BsCalendar3 } from 'react-icons/bs';

import BookingProvider from "./BookingProvider";

import '../styles/App.css'
import Header from "./Header";
import Add from "./Add";
import User from "./User";
import AddBookingForm from "./AddBookingForm";
import AllBookingsReview from "./AllBookingsReview";
import BookingsToAccept from "./BookingsToAccept";
import UserBookings from "./UserBookings";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOnClose = () => {
        setIsModalOpen(false);
    }
    const handleOnClick = () => {
        setIsModalOpen(true);
    }
    // const handleOnClickMyBookings = (event) => {
    //     console.log('my bookings')
    //     event.preventDefault();
    // };

    // const handleOnClickBookingsToAccept = (event) => {
    //     console.log('accept bookings')

    //     event.preventDefault();
    // };


    return (
        <BookingProvider>
            <Router>

                <Header />
                <User />
                {/*<Add />*/}


                <div className='d-flex'>


                    <div className='p-2'>
                        <button className='btn btn-warning ng-scope' onClick={handleOnClick}> <BsCalendarPlus /> Dodaj rezerwację </button>
                    </div>

                    <NavLink to="/" >
                        <div className='ml-auto p-2'>
                            <button className='btn btn-error ng-scope' > <BsCalendar3 /> Wszystkie rezerwacje  </button>
                        </div>
                    </NavLink>

                    <NavLink to="/mybookings" >
                        <div className='ml-auto p-2'>
                            <button className='btn btn-primary'  > <BsFillPersonFill /> Moje rezerwacje  </button>
                        </div>
                    </NavLink>

                    <NavLink to="/acceptbookings" >
                        <div className='p-2'>
                            <button className='btn btn-info ng-scope' > <BsCalendarCheck /> Rezerwacje do akceptacji </button>
                        </div>
                    </NavLink>

                </div>
                <AddBookingForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />


                <body>
                    <section>
                        <Switch>
                            <Route path="/" exact component={AllBookingsReview} />
                            <Route path="/mybookings" exact component={UserBookings} />
                            <Route path="/acceptbookings" exact component={BookingsToAccept} />
                        </Switch>
                    </section>
                </body>
            </Router>
        </BookingProvider>
    );
};
export default App;