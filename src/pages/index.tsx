import React from 'react';
import Header from '../components/Header';
import PortfolioSection from '../components/PortfolioSection';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
    return (
        <div>
            <Header />
            <main id="main-content" role="main" className='mt-12 mb-12 mr-12 ml-12'>
                <PortfolioSection />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;