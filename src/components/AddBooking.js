import React from "react";
import { Redirect } from "react-router";
import '../styles/AddBooking.css';
import App from './App.js';
import BookingList from './BookingList.js';
import Selector from './Selector.js'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';

class AddBooking extends React.Component {

    minDate = new Date().toISOString().slice(0, 10);

    maxDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 10);

    state = {
        bookingOwner: '',
        office: '',
        desk: '',
        guest: false,
        bookingDate: this.minDate,

    }

    handleDate = (e) => {
        this.setState({
            bookingDate: e.target.value

        })
    }

    handleBookingOwner = (e) => {
        this.setState({
            bookingOwner: e.target.value
        })
    }
    handleOffice = (e) => {
        this.setState({
            office: e.target.value
        })
    }
    handleDesk = (e) => {
        this.setState({
            desk: e.target.value
        })
    }
    handleCheckbox = (e) => {
        this.setState({
            guest: e.target.value
        })
    }
    handleClick = () => {
        const { bookingDate, bookingOwner, guest, office, desk } = this.state;

        if (bookingOwner.length > 5 && bookingOwner.indexOf(" ") !== -1 &&
            bookingOwner.indexOf(" ") !== 0 && bookingOwner.indexOf(" ") !== (bookingOwner.length - 1)) {
            const add = this.props.add(bookingDate, bookingOwner, guest, office, desk);
            if (add) {
                this.setState({
                    bookingOwner: '',
                    office: '',
                    desk: '',
                    guest: false,
                    bookingDate: this.minDate,
                })
                // return <Redirect to="/" />
            }
        } else {
            alert("Podaj prawidłową nazwę użytkownika")
        }
    }


    render() {
        return (
            <div className="form">
                <label htmlFor="user">Podaj użytkownika </label>
                <input type="text" placeholder="imię i nazwisko" value={this.state.bookingOwner} id="user"
                    onChange={this.handleBookingOwner} />

                <input type="checkbox" guest={this.state.guest} id="user" onClick={this.handleCheckbox} />
                <label htmlFor="user">Gość</label>
                <br />
                <label htmlFor="date">Podaj datę </label>
                <input type="date" value={this.state.bookingDate}
                    min={this.minDate} max={this.maxDate} onChange={this.handleDate} />
                <br />
                <label htmlFor="office">Wybierz biuro </label>
                <input type="text" placeholder="nazwa biura" value={this.state.office} id="office"
                    onChange={this.handleOffice} />
                <br />
                <label htmlFor="desk">Wybierz biurko </label>
                <input type="text" placeholder="numer biurka" value={this.state.desk} id="desk"
                    onChange={this.handleDesk}
                />
                <nav>
                    <NavLink to="/hotdesk/bookingList" classsName="saveButton"><button onClick={this.handleClick}>Zapisz</button></NavLink>
                    <NavLink to="/" classsName="cancelButton"><button type="button">Anuluj</button></NavLink>
                </nav>

            </div>
        );
    }
}

export default AddBooking;