import { useEffect, useState } from "react";

export default function RepoCommits() {
  const [commits, setCommits] = useState([]);
  const username = "AlexandreJustinRepia";
  const repo = "Portfolio";

  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
      .then((res) => res.json())
      .then((data) => setCommits(data.slice(0, 5))) // show latest 5 commits
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="commits"
      className="bg-black text-white py-16 px-6 md:px-20 min-h-screen scroll-mt-24 overflow-hidden"
      data-aos="fade-left"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 text-center">
        {/* --- Header --- */}
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 relative inline-block group">
            Latest Commits from {repo}
            <span
              className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 h-[3px] w-16 bg-red-500 rounded
              transition-all duration-500 ease-in-out group-hover:w-32"
            ></span>
          </h2>
        </div>

        {/* --- Commit List --- */}
        <ul className="space-y-4 text-left w-full max-w-3xl">
          {commits.map((commit, index) => (
            <li
              key={index}
              className="border-b border-gray-700 pb-3 hover:text-red-400 transition text-lg"
            >
              <a
                href={commit.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                {commit.commit.message}
              </a>
              <p className="text-sm text-gray-400 mt-1">
                by {commit.commit.author.name} on{" "}
                {new Date(commit.commit.author.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
