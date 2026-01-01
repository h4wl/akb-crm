// src/routes/posts/$postId.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/routes/')({
  component: Routes,
})

function Routes() {
  return <div>Routes Component</div>
}
