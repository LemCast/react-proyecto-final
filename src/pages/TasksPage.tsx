import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TaskList } from '../components/TaskList'
import { useTasks } from '../hooks/useTasks'

export function TasksPage() {
  const { tasks, loading, error, refetch } = useTasks()

  return (
    <Box maxWidth={1000} mx="auto" mt={6}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Tasks
          </Typography>
        </Box>
      </Stack>

      <Paper sx={{ p: 3 }}>
        <TaskList tasks={tasks} loading={loading} error={error} onChanged={refetch} />
      </Paper>
    </Box>
  )
}