export interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  updated_at: string
}

export interface FeaturedGitHubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
}

const FEATURED_REPOSITORY_IDS = [617347036, 564415983, 848912262, 1141031041, 1141031572]

export async function fetchFeaturedGitHubRepos(): Promise<FeaturedGitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN
  const repos = await Promise.all(FEATURED_REPOSITORY_IDS.map(async (id) => {
    const response = await fetch(`https://api.github.com/repositories/${id}`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) return null
    return response.json() as Promise<FeaturedGitHubRepo>
  }))

  return repos.filter((repo): repo is FeaturedGitHubRepo => repo !== null)
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`)
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user")
  }
  return response.json()
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repos")
  }
  return response.json()
}
