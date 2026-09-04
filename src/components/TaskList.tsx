import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import type { Task } from '../types'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  loading: boolean
  error: string | null
}

export function TaskList({ tasks, loading, error }: TaskListProps) {
  if (loading) {
    return (
      <Stack alignItems="center" py={4}>
        <CircularProgress />
      </Stack>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  if (tasks.length === 0) {
    return <Typography color="text.secondary">No hay tareas.</Typography>
  }

  return (
    <>
      <Typography variant="subtitle1" gutterBottom>
        Tareas ({tasks.length})
      </Typography>
          <Grid container spacing={2}>
              {tasks.map((task) => (
                  <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex' }}>
                      <TaskCard task={task} />
                  </Grid>
              ))}
          </Grid>
    </>
  )
}