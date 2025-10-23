import { useEffect, useState } from "react";
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
import Modal from '@/Components/Modals/Modal';

export default function Welcome() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const closeModal = () => {
    setModalState({ isOpen: false, type: "", message: "" });
  };

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
      <GuestNavbar />
      <HeroSection />
      <AboutMe />
      <Skills />
      <Projects />
      <Contacts modalState={modalState} setModalState={setModalState} closeModal={closeModal} />
      <RepoCommits />
      <Footer />
      <Modal
        isOpen={modalState.isOpen}
        type={modalState.type}
        message={modalState.message}
        onClose={closeModal}
      />
    </div>
  );
}