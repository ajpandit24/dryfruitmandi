import React, { useState } from 'react'

const Contact = () => {

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) errs.name = 'Name is required.';
    if (!values.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'Enter a valid email.';
    if (!values.phone.trim()) errs.phone = 'Phone is required.';
    else if (!/^(\+?\d{1,3}[- ]?)?\d{7,14}$/.test(values.phone.replace(/\s+/g, ''))) errs.phone = 'Enter a valid phone number.';
    if (!values.message.trim()) errs.message = 'Message is required.';
    else if (values.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  React.useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleSubmit = () => {
    setTouched({ name: true, email: true, phone: true, message: true });
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setIsSubmitting(true);
    // simulate async submit
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTouched({});
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  };

  // expose handlers/vars to JSX above
  // return { form, errors, touched, isSubmitting, submitted, handleChange, handleBlur, handleSubmit };

  return (
    <section className='container mx-auto px-4 py-12 max-w-4xl'>
      <div className='grid grid-cols-2 gap-6'>
        <div>
          <h1 className='section-heading text-4xl font-bold mb-6 text-center'>Contact Us</h1>
          <p className='text-gray-700 mb-4 text-center'>If you have any questions, feedback, or inquiries, please feel free to reach out to us. We value your input and are here to assist you in any way we can.</p>

          <div className='bg-gray-50 p-6 rounded-lg mb-8 space-y-2 text-sm'>
            <p className='text-gray-800'><span className='font-semibold'>Email:</span> info@dryfruitsstore.com</p>
            <p className='text-gray-800'><span className='font-semibold'>Phone:</span> 7710945676</p>
            <p className='text-gray-800'><span className='font-semibold'>Address:</span> K-53, Mudi Bazar, Phase-II Market-1, <br /> Sector-19, Vashi APMC, Navi Mumbai - 400703</p>
            <p className='text-gray-800'><span className='font-semibold'>Business Hours:</span> Monday - Friday: 9:00 AM - 6:00 PM</p>
          </div>
        </div>

        <div>
          <p className='text-gray-700 mb-8 text-center'>We look forward to hearing from you and assisting you with your dry fruit needs!</p>

          <form
            className="contact-form bg-white shadow-md rounded-lg p-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            noValidate
          >
            <div className="form-group mb-3">
              <label htmlFor="name" className='block text-sm font-semibold mb-2'>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              {errors.name && touched.name && <div id="name-error" className="error text-red-500 text-sm mt-1">{errors.name}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className='block text-sm font-semibold mb-2'>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              {errors.email && touched.email && <div id="email-error" className="error text-red-500 text-sm mt-1">{errors.email}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone" className='block text-sm font-semibold mb-2'>Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.phone}
                aria-describedby="phone-error"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              {errors.phone && touched.phone && <div id="phone-error" className="error text-red-500 text-sm mt-1">{errors.phone}</div>}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="message" className='block text-sm font-semibold mb-2'>Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              {errors.message && touched.message && <div id="message-error" className="error text-red-500 text-sm mt-1">{errors.message}</div>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              className='bg-primary disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200'
            >
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </button>

            {submitted && <p className="success text-green-600 text-center mt-4 font-semibold">Thank you! Your enquiry has been sent.</p>}
          </form>
        </div>

      </div>
    </section>
  )
}

export default Contact
