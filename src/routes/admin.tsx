import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: AdminPage,
})

function AdminPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">/admin</h1>
    </div>
  )
}
