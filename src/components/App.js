import React from 'react';
import '../styles/App.css';
import AddBooking from './AddBooking.js';
import BookingList from './BookingList.js';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import header from '../img/header.jpg';


class App extends React.Component {

  //docelowo id z bazy!
  counter = 2;

  state = {
    bookings: [
      {
        id: 0,
        bookingDate: '2021-10-19',
        operator: 'Adam Mickiewicz',
        bookingOwner: 'Stanisław Lem',
        guest: true,
        office: 'devs',
        desk: 'IT.4.23',
        bookingStatus: null,
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
        office: 'devs',
        desk: 'IT.4.15',
        bookingStatus: null,
        statusSetDate: '',
        accept: '',
        deleted: false,
      },
      {
        id: 2,
        bookingDate: '2021-11-15',
        operator: 'Zenon Nowak',
        bookingOwner: 'Andrzej Ziemiański',
        guest: false,
        office: 'devs',
        desk: 'IT.4.15',
        bookingStatus: null,
        statusSetDate: '',
        accept: '',
        deleted: false,
      }
    ]
  }
  changeBookingStatusAccept = (id) => {
    console.log("accept status booking " + id);
    const bookings = [...this.state.bookings];
    bookings.forEach(booking => {
      if (booking.id === id) {
        booking.bookingStatus = true;
        booking.statusSetDate = new Date().getTime()
        console.log(booking);
      }
    })
    this.setState({
      bookings
    })
  }
  changeBookingStatusRefuse = (id) => {
    console.log("refuse status booking " + id);
    const bookings = [...this.state.bookings];
    bookings.forEach(booking => {
      if (booking.id === id) {
        booking.bookingStatus = false;
        booking.statusSetDate = new Date().getTime()
        console.log(booking);
      }
    })

    this.setState({
      bookings
    })
  }
  deleteBooking = (id) => {
    console.log("delete booking " + id);
    const bookings = [...this.state.bookings];
    bookings.forEach(booking => {
      if (booking.id === id) {
        booking.deleted = true;
        console.log(booking);
      }
    })
    /*bookings = bookings.filter(booking => booking.id === id)*/
    this.setState({
      bookings
    })
    alert("Rezerwacja została usunięta")
  }
  addBooking = (bookingDate, bookingOwner, guest, office, desk) => {
    //console.log("dodany obiekt");
    const booking = {
      id: this.counter,
      bookingDate: bookingDate, //from input
      operator: 'Pobrac z commonsDao', //logged user!!!!
      bookingOwner: bookingOwner, //from input
      guest: guest, //from input
      office: office, // from input
      desk: desk, // from input 
      bookingStatus: null,
      statusSetDate: '',
      accept: 'Uprawnienia! Pobrac z commonsDao', //???? logged user 
      deleted: false,
    }
    this.counter++
    console.log(booking, this.counter);

    this.setState(prevState => ({
      bookings: [...prevState.bookings, booking]
    }))

    return true
  }
  render() {
    return (

      <BrowserRouter>
        <div className="App">
          <div className="wrapper">

            <div id="AppHeader">
              <img src={header} alt="Menu PORTA Intranet" />
            </div>

            <div id="AppHeaderText">
              Hot Desk
            </div>

            <body>
              <nav>
                {/* <NavLink to="/" exact>Start</NavLink>  */}
                <NavLink to="/hotdesk/addBooking" className="navButton">
                  <button type="button">Dodaj rezerwację</button>
                </NavLink>
                <NavLink to="/hotdesk/bookingList" className="navButton">
                  <button type="button">Przegląd rezerwacji</button>
                </NavLink>
              </nav>
              <section>
                <Routes>

                  <Route path="/hotdesk/addBooking" exact element={<AddBooking add={this.addBooking} />} />

                  <Route path="/hotdesk/bookingList" exact element={<BookingList bookings={this.state.bookings} accept={this.changeBookingStatusAccept}
                    refuse={this.changeBookingStatusRefuse} delete={this.deleteBooking} />} />

                </Routes>
                {/* <AddBooking add={this.addBooking} />

              <BookingList bookings={this.state.bookings} accept={this.changeBookingStatusAccept}
                refuse={this.changeBookingStatusRefuse} delete={this.deleteBooking} /> */}

              </section>
            </body>
          </div>
          <footer>
            Copyright © 2021, PORTA KMI POLAND (Agnieszka Hewusz)
          </footer>
        </div>
      </BrowserRouter >

    );
  }
}

export default App;


