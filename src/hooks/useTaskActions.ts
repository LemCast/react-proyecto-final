import { useState, type FormEvent } from 'react'
import type { Task } from '../types'
import { deleteTask, patchTask, updateTask } from '../services/taskService'

interface UseTaskActionsOptions {
  task: Task
  onSuccess?: () => void
}

export function useTaskActions({
  task,
  onSuccess,
}: UseTaskActionsOptions) {
  const [editing, setEditing] = useState(false)
  const [patching, setPatching] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [status, setStatus] = useState(task.status)
  const [priority, setPriority] = useState(task.priority)
  const [assigneeId, setAssigneeId] = useState<number | null>(task.assigneeId)
  const [dueDate, setDueDate] = useState(task.dueDate)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const projectId = task.projectId

  const valid = title.trim().length >= 3 && title.trim().length <= 80
  const validStatus = ['TODO', 'IN_PROGRESS', 'DONE'].includes(status)
  const busy = saving || deleting

  function startEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setStatus(task.status)
    setPriority(task.priority)
    setAssigneeId(task.assigneeId)
    setDueDate(task.dueDate)
    setError(null)
    setEditing(true)
  }

  function startPatching() {
    setStatus(task.status)
    setError(null)
    setPatching(true)
  }

  function cancelEditing() {
    setTitle(task.title)
    setDescription(task.description ?? '')
    setStatus(task.status)
    setPriority(task.priority)
    setAssigneeId(task.assigneeId)
    setDueDate(task.dueDate)
    setError(null)
    setEditing(false)
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!valid || busy) return

    setSaving(true)
    setError(null)

    try {
      await updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        status: status,
        priority: priority,
        projectId: projectId,
        assigneeId: assigneeId ?? undefined,
        dueDate: dueDate,
      })
      setEditing(false)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al actualizar la tarea',
      )
    } finally {
      setSaving(false)
    }
  }

  async function handlePatch(newStatus: string) {
    const isValidNewStatus = ['TODO', 'IN_PROGRESS', 'DONE'].includes(newStatus)
    if (!isValidNewStatus || busy) return  
    setSaving(true)
    setError(null)
    setStatus(newStatus)

    try {
      await patchTask(task.id, {
        status: newStatus,
      })
      setPatching(false)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al actualizar la tarea',
      )
    } finally {
      setSaving(false)
    }

  }

  async function handleDelete() {
    if (busy) return

    setDeleting(true)
    setError(null)

    try {
      await deleteTask(task.id)
      onSuccess?.()
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Error al eliminar la tarea',
      )
    } finally {
      setDeleting(false)
    }
  }

  return {
    editing,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    assigneeId,
    setAssigneeId,
    dueDate,
    setDueDate,
    projectId,
    saving,
    deleting,
    error,
    valid,
    validStatus,
    busy,
    patching,
    startPatching,
    startEditing,
    cancelEditing,
    handleUpdate,
    handlePatch,
    handleDelete,
  }
}