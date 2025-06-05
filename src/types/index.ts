export interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    date: string;
}

export interface PortfolioProject {
    id: string;
    title: string;
    description: string;
    link: string;
}

export interface ContactForm {
    name: string;
    email: string;
    message: string;
}