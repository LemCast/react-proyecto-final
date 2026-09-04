import { useCallback, useEffect, useState } from 'react'
import { getProject } from '../services/projectService'
import type { Project } from '../types'

interface UseProjectResult {
  project: Project | null
  loading: boolean
  error: string | null
  refetch: () => void
}

interface UseProjectProps{
    projectId: number
}

export function useProject({ projectId }: UseProjectProps): UseProjectResult {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getProject(projectId)
      .then((data) => {
        if (!cancelled) setProject(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar proyectos')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [reloadKey])

  return { project, loading, error, refetch }
}