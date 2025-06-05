import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, Typography, Avatar } from '@material-tailwind/react';

const galleryImages = [
    'gallery/1.jpg',
    'gallery/2.jpg',
    'gallery/3.jpg',
    'gallery/4.jpg',
    'gallery/5.jpg',
    'gallery/6.jpg',
    'gallery/7.jpg',
    'gallery/8.jpg',
    'gallery/9.jpg',
    'gallery/10.jpg',
];

const About: React.FC = () => {
    return (
        <div>
            <Header />
            <main id="main-content" role="main" className="flex flex-col items-center py-8 px-4">
                <Card className="max-w-2xl w-full shadow-lg p-6 flex flex-col items-center">
                    <div className="mt-8" />
                    <Avatar
                        src="avatar.jpg"
                        alt="Kerry Powell"
                        size="xxl"
                        className="mb-4 shadow-lg border-4 border-white -mt-12"
                    />
                    <Typography variant="h2" className="mt-8 mb-2 font-bold text-center">
                        About Me
                    </Typography>
                    <Typography className="mb-4 text-center">
                        Hi! I'm Kerry Powell. I live in Pocatello, Idaho with my wonderful wife and our three kids (two girls and one boy). I am passionate about web development and design, and I love building things that make a difference.
                    </Typography>
                    <Typography variant="h3" className="mt-8 mb-2 font-semibold">Fun Facts</Typography>
                    <ul className="list-disc ml-6 mb-4 text-left">
                        <li>I enjoy amateur woodworking and creating things with my hands.</li>
                        <li>Gardening is one of my favorite ways to relax and spend time outdoors.</li>
                        <li>Spending time with my family is my top priority.</li>
                        <li>I love reading books on a variety of topics.</li>
                    </ul>
                    <Typography className="text-center">
                        If you'd like to get in touch, feel free to reach out through the contact page!
                    </Typography>
                    <Typography variant="h3" className="mt-8 mb-2 font-semibold text-center">Gallery</Typography>
                    <div className="w-full mb-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {galleryImages.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src}
                                    alt={`Gallery ${idx + 1}`}
                                    className="rounded-lg object-cover w-full h-32 sm:h-40 shadow"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default About;