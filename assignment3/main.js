import { fetchGithubUsername } from "./fetchGithubUsername.js";
import { fetchLatestRepos, renderLatestRepos } from "./fetchLatestRepos.js";
import { renderProfile } from "./renderProfile.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = input.value.trim();
    if (!username) {
      alert("Please enter a username");
      return;
    }

    try {
      const data = await fetchGithubUsername(username);
      renderProfile(data);

      const repos = await fetchLatestRepos(username);
      renderLatestRepos(repos);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
});
