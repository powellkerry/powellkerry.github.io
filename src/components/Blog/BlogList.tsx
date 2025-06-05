import React, { useEffect, useState } from 'react';
import { Card, CardBody, Typography, Button } from '@material-tailwind/react';

const BlogList: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/data/blog-posts.json')
            .then((res) => res.json())
            .then((data) => setPosts(data.posts || []))
            .catch((error) => {setError(error.message); console.error('Error fetching blog posts:', error);})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="space-y-6">
            {posts.map(post => (
                <Card key={post.id} className="blog-post shadow-md">
                    <CardBody>
                        <Typography variant="h5" as="h3" className="mb-2 font-semibold">{post.title}</Typography>
                        <Typography className="mb-2 text-gray-600 text-sm">{post.date}</Typography>
                        <a href={`/blog/${post.id}`}>
                          <Button color="blue-gray" variant="outlined" size="sm">
                            Read more
                          </Button>
                        </a>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default BlogList;