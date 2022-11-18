import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link, useLocation } from 'react-router-dom';
import topImage from '../assets/images/top.png';

const TopContent = () => {

    const location = useLocation();

    return (
        <div className="top-header">
            {location.pathname === '/' ?
                <div className="bg-light">
                    <div className="row py-4">
                        <div className="col-6 px-5 md:px-24 xs:px-10">
                            <h1 className="capitalize lg:text-5xl xs:text-xl font-bold pb-3 lg:tracking-wide" data-aos="fade-down">We provide you awesome fresh groceries</h1>
                            <span className="text-gray-500 " data-aos="fade-down">What to restock you home with groceries? Here we are to provide fresh groceries directly from the farm</span>
                            <div className="py-3" data-aos="fade-down">
                                <Button variant="dark">
                                    <Link to="#products" className="text-white text-decoration-none">Get started</Link>
                                </Button>
                            </div>
                            <div className="row">
                                <div data-aos="fade-up" className="col-4">
                                    <div className="flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">1200</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Groceries listed</p>
                                </div>
                                <div data-aos="fade-up" className="col-4">
                                    <div className="flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">4500</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Happy customers</p>
                                </div>
                                <div data-aos="fade-up" className="col-4">
                                    <div className="flex items-center gap-1">
                                        <span className="fw-bold fs-5 text">1000</span>
                                        <span className="fw-bold fs-5 text text-primary">
                                            +
                                        </span>
                                    </div>
                                    <p className="text-secondary fs-6 text">Reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="top-section-bgImage col-6" data-aos="zoom-in">
                            <img src={topImage} alt="top_content" width="300" />
                        </div>
                    </div>
                </div>
            : <div></div>}
        </div>

    )
}

export default TopContent
