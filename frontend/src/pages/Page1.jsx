import React, { useState } from 'react';
import "./styles1.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Page1 = () => {
    const [formData, setFormData] = useState({
        username: '',
        pCodeLang: 'C++',
        stdin: '',
        sourcecode: ''
    });

    const { username, pCodeLang, stdin, sourcecode } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://localhost:3001/api/', formData)
            .then(response => {
                console.log(response.data);
                // Clear form fields after successful submission
                setFormData(prevState => ({
                    ...prevState,
                    username: '',
                    pCodeLang: 'C++',
                    stdin: '',
                    sourcecode: ''
                }));
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <div className="container">
            <Link to="/submissions" className="link">
                <button className="button secondary">Go to Submissions</button>
            </Link>

            <form onSubmit={handleSubmit} className="form">
                <h2>Page 1 - Enter code details here:</h2>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="input"
                />
                <label>Programming Language</label>
                <select
                    value={pCodeLang}
                    onChange={handleChange}
                    name="pCodeLang"
                    className="select"
                >
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                </select>
                <textarea
                    rows={3}
                    placeholder="Standard Input"
                    value={stdin}
                    onChange={handleChange}
                    name="stdin"
                    className="textarea"
                />
                <textarea
                    rows={5}
                    placeholder="Source Code"
                    value={sourcecode}
                    onChange={handleChange}
                    name="sourcecode"
                    required
                    className="textarea"
                />
                <button type="submit" className="button primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Page1;