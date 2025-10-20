export default function GuestNavbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold font-mono">
        <span className="text-red-500">&lt;</span>AJR<span className="text-red-500">/&gt;</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex gap-8 text-lg font-poppins">
        <li><a href="#home" className="hover:text-red-400 transition">Home</a></li>
        <li><a href="#about" className="hover:text-red-400 transition">About</a></li>
        <li><a href="#skills" className="hover:text-red-400 transition">Skills</a></li>
        <li><a href="#projects" className="hover:text-red-400 transition">Projects</a></li>
        <li><a href="#contact" className="hover:text-red-400 transition">Contact</a></li>
      </ul>
    </nav>
  );
}
