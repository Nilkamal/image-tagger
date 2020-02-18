import React from 'react';
import { Link } from 'react-router-dom';
import './header-styles.scss';

const Header = (props) => (
    <header>
        <h1>Image Tagger</h1>
        <nav>
            <ul>
                <li>
                    <Link to='/upload-image'>Upload Image</Link>                    
                </li>
                <li>
                    <Link to='/search-image'>Search Image</Link>                    
                </li>
            </ul>
        </nav>
    </header>
)
export default Header;