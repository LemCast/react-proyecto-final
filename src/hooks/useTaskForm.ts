import { useState } from 'react'
import { createTask } from '../services/taskService'
import dayjs from 'dayjs'

interface UseTaskFormOptions {
    projectId: number
    onSuccess?: () => void
}

export function useTaskForm({ projectId, onSuccess }: UseTaskFormOptions) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('TODO')
    const [priority, setPriority] = useState('MED')
    const [asigneeId, setAsigneeId] = useState<number | null>(null)
    const [dueDate, setDueDate] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const valid = title.trim().length >= 3

    function reset() {
        setTitle('')
        setDescription('')
        setStatus('TODO')
        setPriority('MED')
        setAsigneeId(null)
        setDueDate('')
        setError(null)
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!valid || submitting) return

        if (dueDate && dayjs(dueDate).isBefore(dayjs(), 'day')) {
            setError('La fecha de vencimiento no puede ser pasada')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            await createTask({
                title: title.trim(),
                description: description.trim() || undefined,
                status: status,
                priority: priority,
                assigneeId: asigneeId || undefined,
                projectId: projectId,
                dueDate: dueDate,
            })
            reset()
            onSuccess?.()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la tarea')
        } finally {
            setSubmitting(false)
        }
    }

    return {
        title,
        setTitle,
        description,
        setDescription,
        status,
        setStatus,
        priority,
        setPriority,
        projectId,
        asigneeId,
        setAsigneeId,
        dueDate,
        setDueDate,
        submitting,
        error,
        valid,
        handleSubmit,
    }
}