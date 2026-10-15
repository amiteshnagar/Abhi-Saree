import { useState } from 'react';
import Header from './components/Header';
import WelcomeSection from './components/WelcomeSection';
import FeaturedCollection from './components/FeaturedCollection';
import CategoryHighlights from './components/CategoryHighlights';
import CustomerTrust from './components/CustomerTrust';
import Footer from './components/Footer';
import './App.css';

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <Header
                isMenuOpen={isMenuOpen}
                onToggleMenu={handleToggleMenu}
                onCloseMenu={handleCloseMenu}
            />
            <main>
                <WelcomeSection />
                <FeaturedCollection />
                <CategoryHighlights />
                <CustomerTrust />
            </main>
            <Footer />
        </>
    );
}
