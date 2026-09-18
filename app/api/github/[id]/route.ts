import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const token = process.env.GITHUB_TOKEN;
  const { id } = params;

  try {
    // Fetch repository details
    const repoResponse = await fetch(
      `https://api.github.com/repositories/${id}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 },
      } as any
    );

    if (!repoResponse.ok) {
      console.error(`Failed to fetch repo ID ${id}: ${repoResponse.status}`);
      return NextResponse.json(
        { error: 'Failed to fetch repository' },
        { status: repoResponse.status }
      );
    }

    const repo = await repoResponse.json();

    // Fetch README content
    const readmeResponse = await fetch(
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`,
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
      `https://api.github.com/repos/${repo.owner.login}/${repo.name}/languages`,
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
      ...repo,
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
