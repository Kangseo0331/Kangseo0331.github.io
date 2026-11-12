import { createFileRoute } from '@tanstack/react-router'
import { project } from '../../pages/project-page'

export const Route = createFileRoute('/projects/')({
  component: project
})

