import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [message, setMessage] = useState('');

    
    const handleFormData = (e) => {
        const { name, value } = e.target; 
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
            setMessage("Form data submitted successfully");
            console.log(data);
        } catch (error) {
            console.log(error);
            setMessage("Not submitted");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleFormData} 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleFormData} 
                />
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ContactForm;
