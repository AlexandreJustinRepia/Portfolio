import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

import { Head } from '@inertiajs/react';
import GuestNavbar from '@/Components/Navbar/GuestNavbar';
import HeroSection from '@/Components/HeroSection';
import AboutMe from '@/Components/AboutMe';
import Skills from '@/Components/Skills';
import Projects from '@/Components/Projects';
import Contacts from '@/Components/Contacts';
import RepoCommits from "@/Components/RepoUpdates";
import Footer from '@/Components/Footer';

export default function Welcome() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (ms)
      once: true,     // animation triggers once per scroll
      easing: "ease-out-cubic",
      offset: 50,
    });
  }, []);

  return (
    <div className="bg-black overflow-x-hidden">
      <Head title="Welcome" />
      <GuestNavbar/>
      <HeroSection/>
      <AboutMe/>
      <Skills/>
      <Projects/>
      <Contacts/>
      <RepoCommits/>
      <Footer/>
    </div>
  );
}
