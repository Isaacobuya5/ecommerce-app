import React from 'react';
import Directory from '../../components/directory/directory.component';
import './homepage.styles.scss';

// This component will be used only once- the reason why it is not in the components folder
const HomePage = () => (
    <div className='homepage'>
        <Directory />
    </div>
);

export default HomePage;