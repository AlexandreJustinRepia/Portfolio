import { Link } from '@inertiajs/react';

export default function ApplicationLogo() {
  return (
    <Link
      href="/"
      className="
        text-4xl md:text-3xl font-extrabold font-mono
        text-white transition-all duration-500 ease-in-out
        hover:scale-110 hover:text-red-500
        cursor-pointer select-none
      "
    >
      <span className="text-red-500 transition-colors duration-500 hover:text-white">
        &lt;
      </span>
      AJR
      <span className="text-red-500 transition-colors duration-500 hover:text-white">
        /&gt;
      </span>
    </Link>
  );
}
