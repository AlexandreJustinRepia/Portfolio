import { useState } from "react";
import { Menu, X } from "lucide-react"; // ← install if not yet: npm install lucide-react
import ApplicationLogo from "../ApplicationLogo";

export default function GuestNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
        {/* Logo */}
        <ApplicationLogo/>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-lg font-poppins">
            <li><a href="#home" className="hover:text-red-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-red-400 transition">About</a></li>
            <li><a href="#skills" className="hover:text-red-400 transition">Skills</a></li>
            <li><a href="#projects" className="hover:text-red-400 transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-red-400 transition">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
        >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
            <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-6 py-6 md:hidden border-t border-gray-700">
            <a href="#home" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#about" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>About</a>
            <a href="#skills" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Skills</a>
            <a href="#projects" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Projects</a>
            <a href="#contact" className="hover:text-red-400 transition" onClick={() => setIsOpen(false)}>Contact</a>
            </div>
        )}
    </nav>
  );
}
