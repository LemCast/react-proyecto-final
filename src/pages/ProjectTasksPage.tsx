import LogoutIcon from '@mui/icons-material/Logout'
import AssignmentIcon from '@mui/icons-material/Assignment'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
import { useAuth } from '../hooks/useAuth'
import { useTaskForm } from '../hooks/useTaskForm'
import { useProjectTasks } from '../hooks/useProjectTasks'
import { useState } from 'react'
import { useProject } from '../hooks/useProject'

export function ProjectTasksPage() {
    const { projectId } = useParams<{ projectId: string }>()
    const { logout } = useAuth()
    const navigate = useNavigate()
    const { tasks, loading, error, refetch } = useProjectTasks(projectId ? parseInt(projectId, 10) : null)
    const taskForm = useTaskForm({ projectId: projectId ? parseInt(projectId, 10) : 0, onSuccess: refetch })
    const [creatingTask, setCreatingTask] = useState(false)
    const { project } = useProject({ projectId: projectId ? parseInt(projectId, 10) : 0 })

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <Box maxWidth={640} mx="auto" mt={6}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                    <Typography variant="h4" gutterBottom>
                        {project && project.name}
                    </Typography>
                </Box>
            </Stack>
            <Button startIcon={<AssignmentIcon />} onClick={() => setCreatingTask(true)}>
                    Crear tarea
                </Button>
                <Button startIcon={<LogoutIcon />} onClick={handleLogout}>
                    Cerrar sesión
                </Button>

            {creatingTask && (
                <Paper sx={{ p: 3, mb: 3 }}>
                    <TaskForm {...taskForm} onClose={() => setCreatingTask(false)} />
                </Paper>
            )}
            <Paper sx={{ p: 3 }}>
                <TaskList tasks={tasks} loading={loading} error={error} />
            </Paper>
        </Box>
    )
}