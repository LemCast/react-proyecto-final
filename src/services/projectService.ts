import { httpClient } from './httpClient'
import type { NewProject, Project, Task } from '../types'

export async function getProjects(): Promise<Project[]> {
  const { data } = await httpClient.get<Project[]>('/projects')
  return data
}

export async function getProject(projectId: number): Promise<Project> {
  const { data } = await httpClient.get<Project>(`/projects/${projectId}`)
  return data
}

export async function createProject(body: NewProject): Promise<Project> {
  const { data } = await httpClient.post<Project>('/projects', body)
  return data
}

export async function getProjectTasks(projectId: number): Promise<Task[]> {
  const { data } = await httpClient.get<Task[]>(`/projects/${projectId}/tasks`)
  return data
}