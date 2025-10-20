import LogoLoop from './LogoLoop';
import {
  SiLaravel,
  SiVuedotjs,
  SiMysql,
  SiPhp,
  SiHtml5,
  SiApache,
  SiSqlite,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiMariadb,
  SiReact,
  SiTailwindcss
} from 'react-icons/si';

const techLogos = [
  { node: <SiLaravel size={48} color="#ff2d2d" />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiVuedotjs size={48} color="#42b883" />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <SiReact size={48} color="#61dafb" />, title: "React", href: "https://react.dev" },
  { node: <SiTailwindcss size={48} color="#38bdf8" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPhp size={48} color="#787cb5" />, title: "PHP", href: "https://www.php.net" },
  { node: <SiHtml5 size={48} color="#e34f26" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiApache size={48} color="#d22128" />, title: "Apache", href: "https://httpd.apache.org" },
  { node: <SiMysql size={48} color="#4479a1" />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiMariadb size={48} color="#003545" />, title: "MariaDB", href: "https://mariadb.org" },
  { node: <SiSqlite size={48} color="#003b57" />, title: "SQLite", href: "https://www.sqlite.org" },
  { node: <SiGit size={48} color="#f34f29" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub size={48} color="#ffffff" />, title: "GitHub", href: "https://github.com" },
  { node: <SiNodedotjs size={48} color="#8cc84b" />, title: "Node.js", href: "https://nodejs.org" }
];

function Logo() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
      <LogoLoop
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}

export default Logo;
