export async function fetchGithubUsername(username) {
  const url = `https://api.github.com/users/${username}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}
