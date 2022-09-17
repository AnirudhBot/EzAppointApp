import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function () {
    document.body.style.backgroundColor = '#253047'
      document.body.style.color = 'white'
    return (

        <>
            <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" data-bs-pause="false">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" data-ride="carousel" data-interval="2">
                    <div className="carousel-item active">
                        <div className="d-block w-100" alt="...">
                            <div id='image1' className='min-vh-100'/>
                            <div className="custom-carousel-caption d-none d-md-block">
                                <h2>Easy Appointment Booking!</h2>
                                <p>Book Clinic Appointments easily from the comforts of your homes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <div className="d-block w-100" alt="...">
                            <div id='image2' className='min-vh-100'/>
                            <div className="custom-carousel-caption d-none d-md-block">
                                <h2>Current Queue Status!</h2>
                                <p>Check current queue status and plan your trip to clinic accordingly and save time from standing in long queues.</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                    <div className="d-block w-100" alt="...">
                            <div id='image3' className='min-vh-100'/>
                            <div className="custom-carousel-caption d-none d-md-block">
                                <h2>Find Your Nearest Clinic!</h2>
                                <p>Find clinic of any speciality nearest to you!.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-carousel-caption" style={{margin:'100px 0'}}>
                <Link to="/register" className="btn btn-info mx-2">Register as Clinic</Link> |
                <Link to="/reguser" className="btn btn-info mx-2">Register as a User</Link>                 
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}
