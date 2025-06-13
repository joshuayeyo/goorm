export async function fetchLatestRepos(username) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=5`
  );
  const repos = await res.json();
  return repos;
}

export function renderLatestRepos(repos) {
  const repoList = document.getElementById("latest-repos");
  repoList.innerHTML = "";

  repos.forEach((repo) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div class="repo-card">
            <div class="repo-title">
            <a href="${repo.html_url}" target="_blank"><strong>${repo.name}</strong></a>
            </div>
            <div class="repo-activities">
            <p class="repo-stars">
                Stars: ${repo.stargazers_count};
            </p>
            <p class="repo-watchers">
                Watchers: ${repo.watchers_count};

            </p>
            <p class="repo-forks">
                Forks: ${repo.forks_count}
            </p>
            </div>
        </div>
    `;
    repoList.appendChild(li);
  });
}
