import { useEffect, useState } from "react";
import { FaGithub, FaSyncAlt } from "react-icons/fa";

export default function RepoCommits() {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // State to trigger refresh
  const username = "AlexandreJustinRepia";
  const repo = "Portfolio";
  const repoCommitsUrl = `https://github.com/${username}/${repo}/commits`;

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch commits");
        }
        return res.json();
      })
      .then((data) => {
        setCommits(data.slice(0, 6)); // Show latest 6 commits
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.error(err);
      });
  }, [refreshTrigger]); // Re-run effect when refreshTrigger changes

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1); // Increment to trigger useEffect
  };

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

        {/* --- Refresh Button --- */}
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
          data-aos="fade-up"
          data-aos-delay="100"
          disabled={loading}
        >
          <FaSyncAlt className={`text-white ${loading ? "animate-spin" : ""}`} />
          Refresh Commits
        </button>

        {/* --- Loading State --- */}
        {loading && (
          <div className="text-gray-400 text-lg">Loading commits...</div>
        )}

        {/* --- Error State --- */}
        {error && (
          <div className="text-red-400 text-lg">
            Error: {error}. Please try again later.
          </div>
        )}

        {/* --- Commit Cards --- */}
        {!loading && !error && commits.length === 0 && (
          <div className="text-gray-400 text-lg">No commits found.</div>
        )}
        {!loading && !error && commits.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {commits.map((commit, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <FaGithub className="text-red-400 text-2xl" />
                    <h3 className="text-lg sm:text-xl font-semibold text-white truncate">
                      {commit.commit.message}
                    </h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    by {commit.commit.author.name}
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    {new Date(commit.commit.author.date).toLocaleDateString()}
                  </p>
                  <a
                    href={commit.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-red-400 font-semibold rounded-md border border-red-400 hover:bg-red-400 hover:text-white transition"
                  >
                    View Commit
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- View More Button --- */}
        {!loading && !error && commits.length > 0 && (
          <a
            href={repoCommitsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            View More Commits
          </a>
        )}
      </div>
    </section>
  );
}