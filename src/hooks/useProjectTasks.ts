import { useCallback, useEffect, useState } from 'react'
import { getProjectTasks } from '../services/projectService'
import type { Task } from '../types'

interface UseProjectTasksResult {
  tasks: Task[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useProjectTasks(projectId: number | null): UseProjectTasksResult {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const refetch = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!projectId) {
      setTasks([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getProjectTasks(projectId)
      .then((data) => {
        if (!cancelled) setTasks(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar tareas')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [projectId, reloadKey]) // <- projectId también dispara refetch si cambia

  return { tasks, loading, error, refetch }
}