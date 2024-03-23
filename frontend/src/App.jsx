import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";

import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

const App = () => {
    const [submissions, setSubmissions] = useState([]);

    const handleSubmit = (formData) => {
        setSubmissions([...submissions, formData]);

    };

    return (

            <div>
                <Routes>
                    <Route path="/" element={<Page1 onSubmit={handleSubmit} />} />
                    <Route path="/submissions" element={<Page2 />} />
                </Routes>
            </div>

    );
};

export default App;
