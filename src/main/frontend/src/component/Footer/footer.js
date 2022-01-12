import React from 'react';

//component for footer
const Footer = () => {
    const style = {backgroundColor: 'rgba(0, 0, 0, 0.05)'};
    return (
            <footer className="text-center text-lg-start" style={style}>
                <div className="container pt-4 pb-0">
                    <div className="row d-flex justify-content-center">

                            <p className="text-center">For more information, please contact</p>
                            <p className="text-center">
                                <a href="">sundiwen163@gmail.com</a>
                            </p>
                            <p className="text-center">© 2022 Copyright:
                                <a className="text-dark" href="https://mdbootstrap.com/"> Myblog.com</a>
                            </p>
                        </div>

                </div>
        </footer>
    )};

export default Footer;