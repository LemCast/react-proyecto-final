import { httpClient } from './httpClient'
import type { NewTask, Task, UpdateTask } from '../types'

export async function getTasks(): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>('/tasks')
  return data
}

export async function createTask(body: NewTask): Promise<Task> {
  const { data } = await httpClient.post<Task>(`/projects/${body.projectId}/tasks`, body)
  return data
}

export async function updateTask(id: number, body: UpdateTask): Promise<Task> {
  const { data } = await httpClient.put<Task>(`/tasks/${id}`, body)
  return data
}

export async function patchTask(id: number, body: Partial<UpdateTask>): Promise<Task> {
  const { data } = await httpClient.patch<Task>(`/tasks/${id}/status`, body)
  return data
}

export async function deleteTask(id: number): Promise<void> {
  await httpClient.delete(`/tasks/${id}`)
}