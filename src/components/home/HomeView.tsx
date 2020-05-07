import React from 'react';
import app from '../../auth';

const HomeView = () => (
    <div>
        <h4>Home</h4>
        <button onClick={() => app.auth().signOut()}>Sing out</button>
    </div>
);

export default HomeView;