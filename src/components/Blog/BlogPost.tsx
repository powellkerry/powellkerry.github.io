import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BlogPost = () => {
    const params = useParams<{ id: string }>();
    const id = Number(params.id);
    const [post, setPost] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch('data/blog-posts.json');
                const data = await response.json();
                const found = data.posts.find((p: any) => p.id === id);
                setPost(found);
            } catch (err: any) {
                setError('Could not load blog post.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error || !post) {
        return <div>{error || 'Post not found.'}</div>;
    }

    return (
        <div>
            <Header />
            <main id="main-content" role="main" className="flex flex-col items-center py-8 px-4 min-h-screen bg-gray-50">
                <Card className="max-w-2xl w-full shadow-lg p-6">
                    <CardBody>
                        <Typography variant="h3" as="h2" className="mb-2 font-bold text-center">{post.title}</Typography>
                        <Typography className="text-gray-500 mb-4 text-center">Published on: {new Date(post.date).toLocaleDateString()}</Typography>
                        <div className="blog-post-content prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
                        <div className="mt-8 flex justify-center">
                            <Button color="teal" variant="outlined" onClick={() => window.history.back()}>
                                Back to Blog
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </main>
            <Footer />
        </div>
    );
};

export default BlogPost;