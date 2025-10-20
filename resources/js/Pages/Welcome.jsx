import { Head, Link } from '@inertiajs/react';
import GuestNavbar from '@/Components/Navbar/GuestNavbar';
import HeroSection from '@/Components/HeroSection';

export default function Welcome({ auth, laravelVersion, phpVersion }) {

    return (
        <div className="bg-black">
            <GuestNavbar/>
            <HeroSection/>
        </div>
        
    );
}
