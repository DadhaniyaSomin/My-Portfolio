import { ProjectDetail } from "@/components/ProjectDetail"

interface ProjectPageProps {
  params: {
    id: string
  }
}

async function getProjectDetails(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/github/${id}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch project details')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching project details:', error)
    return null
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectDetails(params.id)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ProjectDetail project={project} />
    </div>
  )
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProjectDetails(params.id)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.name} - Somin Dadhaniya`,
    description: project.description || `View details about ${project.name} project`,
  }
}
