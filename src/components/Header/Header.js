import React from 'react';

import name from '../../assets/name.png';
import s from './Header.module.scss';

const Header = () => {

    return(
        <header className = {s.main}>
            <div className={s.main_image}>
                <img 
                    src = {name}
                    className = {s.main_image_img}
                    alt = 'Events'
                />
            </div>
        </header>
    );

};

export default Header;