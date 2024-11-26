import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './ContactDealership.css';

const ContactDealership = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const navigate = useNavigate(); // Initialize navigate function

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        // Simulate sending message
        alert('Your message has been sent successfully! Redirecting to Home.');

        // Redirect to home page after submission
        navigate('/');
    };

    return (
        <div className="contact-dealership">
            <h1>Contact the Dealership</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
        </div>
    );
};

export default ContactDealership;
