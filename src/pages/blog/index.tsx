import React from 'react';
import BlogList from '../../components/Blog/BlogList';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogPage: React.FC = () => {
    return (
        <div>
            <Header />
            <main id="main-content" role="main" className="flex flex-col items-center py-8 px-4 min-h-screen bg-gray-50">
                <Card className="max-w-3xl w-full shadow-lg p-6">
                    <CardBody>
                        <Typography variant="h3" as="h2" className="mb-6 font-bold text-center">
                            Blog
                        </Typography>
                        <BlogList />
                    </CardBody>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPage;