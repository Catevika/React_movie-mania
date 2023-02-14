import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        toast.success('Email sent successfully', {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: 'dark'
        });
      }, (error) => {
        console.log(error.text);
        toast.error('Email sending failed', {
          position: toast.POSITION.BOTTOM_CENTER,
          theme: 'dark'
        });
      });

    form.current.reset();
  };

  return (
    <div className='form-container'>
      <form ref={form} className='form-wrapper' onSubmit={sendEmail}>
        <p title='Contact us' className='form-text'>Contact us&#58;</p>
        <div className='form-group'>
          <label title='Full name' htmlFor='username'>
            Full name
          </label>
          <input
            type='text'
            id='username'
            name='username'
            title='Full name: from 2 to 20 characters'
            minLength={2}
            maxLength={20}
            required
            placeholder='Enter your full name'
            autoComplete='username'
            className='form-input'
          />
        </div>
        <div className='form-group'>
          <label title='Email' htmlFor='email'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            title='Email: up to 20 characters'
            maxLength={20}
            required
            placeholder="Enter your email"
            autoComplete='email'
            className='form-input'
          />
        </div>
        <div className='form-group'>
          <label title='subject' htmlFor='subject'>
            Subject
          </label>
          <input
            type='text'
            id='subject'
            name='subject'
            title='Subject: from 2 to 50 characters'
            minLength={2}
            maxLength={50}
            required
            placeholder="Enter a subject"
            className='form-input'
          />
        </div>
        <div className='form-group'>
          <label title='message' htmlFor='message'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            title='Message: from 2 to 42O characters'
            minLength={2}
            maxLength={420}
            required
            placeholder="Enter your message"
            className='form-input textarea'
          />
        </div>
        <button title='Send' type='submit' className='form-btn'>
          Send
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};
