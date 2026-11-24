import { createFileRoute } from '@tanstack/react-router'
import { about } from '../pages/about-me'

export const Route = createFileRoute('/about')({
  component: about
})
