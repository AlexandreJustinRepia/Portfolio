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

const logoSize = 90

const techLogos = [
  { node: <SiLaravel size={logoSize} color="#ff2d2d" />, title: "Laravel", href: "https://laravel.com" },
  { node: <SiVuedotjs size={logoSize} color="#42b883" />, title: "Vue.js", href: "https://vuejs.org" },
  { node: <SiReact size={logoSize} color="#61dafb" />, title: "React", href: "https://react.dev" },
  { node: <SiTailwindcss size={logoSize} color="#38bdf8" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiPhp size={logoSize} color="#787cb5" />, title: "PHP", href: "https://www.php.net" },
  { node: <SiHtml5 size={logoSize} color="#e34f26" />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { node: <SiApache size={logoSize} color="#d22128" />, title: "Apache", href: "https://httpd.apache.org" },
  { node: <SiMysql size={logoSize} color="#4479a1" />, title: "MySQL", href: "https://www.mysql.com" },
  { node: <SiMariadb size={logoSize} color="#003545" />, title: "MariaDB", href: "https://mariadb.org" },
  { node: <SiSqlite size={logoSize} color="#003b57" />, title: "SQLite", href: "https://www.sqlite.org" },
  { node: <SiGit size={logoSize} color="#f34f29" />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub size={logoSize} color="#ffffff" />, title: "GitHub", href: "https://github.com" },
  { node: <SiNodedotjs size={logoSize} color="#8cc84b" />, title: "Node.js", href: "https://nodejs.org" }
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
