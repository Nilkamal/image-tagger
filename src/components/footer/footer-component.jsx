import React from 'react';
import './footer-styles.scss';

const Footer = () => (
    <footer className='footer'>
        <section className="copyright">
            <h2>Created By Nilkamal | {new Date().getFullYear()}</h2>
        </section>
    </footer>
)

export default Footer;