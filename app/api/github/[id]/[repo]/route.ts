import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string; repo: string } }
) {
  const token = process.env.GITHUB_TOKEN;
  const { id: owner, repo } = params;

  console.log('Fetching project details for:', owner, repo);

  try {
    // Fetch repository details
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      } as any
    );

    console.log('GitHub API response status:', repoResponse.status);

    if (!repoResponse.ok) {
      const errorText = await repoResponse.text();
      console.error(`Failed to fetch repo ${owner}/${repo}:`, repoResponse.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch repository', details: errorText },
        { status: repoResponse.status }
      );
    }

    const repoData = await repoResponse.json();
    console.log('Repository data received:', repoData.name);

    // Fetch README content
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/readme`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      } as any
    );

    let readmeContent = '';
    if (readmeResponse.ok) {
      const readmeData = await readmeResponse.json();
      if (readmeData.content) {
        readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
      }
    }

    // Fetch languages
    const languagesResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/languages`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      } as any
    );

    let languages = {};
    if (languagesResponse.ok) {
      languages = await languagesResponse.json();
    }

    return NextResponse.json({
      ...repoData,
      readme: readmeContent,
      languages,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repository details' },
      { status: 500 }
    );
  }
}
