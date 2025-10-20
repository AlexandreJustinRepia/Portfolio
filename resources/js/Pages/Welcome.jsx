import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

import { Head } from '@inertiajs/react';
import GuestNavbar from '@/Components/Navbar/GuestNavbar';
import HeroSection from '@/Components/HeroSection';
import AboutMe from '@/Components/AboutMe';

export default function Welcome() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (ms)
      once: true,     // animation triggers once per scroll
      easing: "ease-out-cubic"
    });
  }, []);

  return (
    <div className="bg-black">
      <Head title="Welcome" />
      <GuestNavbar />
      <HeroSection />
      <AboutMe />
    </div>
  );
}
