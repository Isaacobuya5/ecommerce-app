import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss';

/*******
 * withRouter is normally a higher order component 
 * higher order component is a function that takes a component as an arguement and returns
 * a new modified component
 * In this case, we need to modify our menu component to have access to 
 * the things related to our router
 */
//we need to obtain many properties as props fom the parent directory component
const MenuItem = ({title, imageUrl, size, history, linkUrl, match }) => (
    <div 
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}>
        <div className="background-image" style={{
            backgroundImage: `url(${imageUrl})`
        }} />
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

// returns a menu item that now has access to history, location and etc
export default withRouter(MenuItem);