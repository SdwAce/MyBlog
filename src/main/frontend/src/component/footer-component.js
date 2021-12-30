import React from 'react';

const Footer = () => {
    const style = {backgroundColor: 'rgba(0, 0, 0, 0.05)'};
    return (
            <footer className="bg-light text-center text-lg-start">
                <section
                    className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
                >
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="" className="me-4 text-reset">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>
                </section>
                <div className="container p-4">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-12">
                            <p className="text-center">For more information, please contact</p>
                            <p className="text-center">
                                <a href="">sundiwen163@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center p-3" style={style}>
                    © 2022 Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">Myblog.com</a>
                </div>
        </footer>
    )};

export default Footer;