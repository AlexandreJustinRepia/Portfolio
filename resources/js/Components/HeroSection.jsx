import NameTypingAnim from './Animation/NameTypingAnim';

export default function HeroSection() {
return (
    <section
        id="home"
        className="bg-black text-white min-h-screen flex items-center px-8 md:px-20"
        >
        <div className="max-w-3xl space-y-6">
            {/* Small Intro */}
            <p className="text-gray-400 text-lg">Hi, I'm</p>

            {/* Name Typing Animation*/}
            <NameTypingAnim></NameTypingAnim>

            {/* Role */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-200 font-poppins">
                Full Stack Web Developer <span className="text-red-400">|</span> Laravel <span className="text-red-400">•</span> Vue <span className="text-red-400">•</span> React
            </h2>

            {/* Short Bio */}
            <p className="text-gray-400 text-base md:text-lg font-poppins">
                I build secure, scalable web applications with Laravel and Vue.
                Currently exploring React and UI design to create complete web experiences.
            </p>

            {/* Buttons */}
            <div className="flex items-center gap-6 mt-8">
                <a
                    href="#projects"
                    className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-500 transition"
                >
                    View Projects
                </a>

                <a
                    href="#contact"
                    className="text-red-400 font-semibold px-6 py-3 rounded-md border border-transparent hover:border-red-400 hover:text-red-300 transition"
                >
                    Contact Me
                </a>
            </div>
        </div>
    </section>
);
}
