import React from 'react';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeYKsQrUeYBqAiGviZXb7jtJMGeaBQCaIRBOkPIM-cKIPY8lw/viewform?embedded=true'; // Replace with your actual Google Form embed URL

const Contact: React.FC = () => {
    return (
        <div>
            <Header />
            <main id="main-content" role="main" className="flex flex-col items-center py-8 px-4 min-h-screen bg-gray-50">
                <Card className="max-w-2xl w-full shadow-lg p-6 flex flex-col items-center mb-8">
                    <Typography variant="h3" as="h2" className="mb-6 font-bold text-center">
                        Contact Me
                    </Typography>
                    <Typography className="mb-4 text-center">
                        Please use the form below to get in touch. All fields are required.
                    </Typography>
                </Card>
                <div className="w-full">
                    <iframe
                        src={GOOGLE_FORM_URL}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Contact Form"
                        className="w-full rounded-lg"
                        aria-label="Contact form"
                    >
                        Loading…
                    </iframe>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;