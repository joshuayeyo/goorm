export function renderProfile(data) {
  const profileSectionDiv = document.getElementById("profile-section");

  //   const joinedDate = new Date(data.created_at).toLocaleDateString("ko-KR");

  profileSectionDiv.innerHTML = `
    <div class="profile-card">
        <div class="avatar-container">
            <img 
                id="profile-avatar" 
                src="${data.avatar_url}" 
                alt="${data.login} avatar" 
            />
            <a 
                href="${data.html_url}" 
                target="_blank"
                class="view-profile-button"
            >
                View Profile
            </a>
        </div>
        <div class="profile-info">
            <div class="profile-header">
                <p class="p-repos">Public Repos: ${data.public_repos}</p>
                <p class="p-gists">Public Gists: ${data.public_gists}</p>
                <p class="followers">Followers: ${data.followers}</p>
                <p class="following">Following: ${data.following}</p>
            </div>
            <div class="profile-details">
                <p class="info-cards">Company: ${data.company || "N/A"}</p>
                <p class="info-cards">Website/Blog: 
                    ${
                      data.blog
                        ? `<a href="${data.blog}" target="_blank">${data.blog}</a>`
                        : "N/A"
                    }
                </p>
                <p class="info-cards">Location: ${data.location || "N/A"}</p>
                <p class="info-cards">Member Since: ${data.created_at}</p>
            </div>
        </div>
    </div>
    `;
}
