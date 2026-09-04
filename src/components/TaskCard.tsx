import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import type { Task } from '../types'

function getStatusColor(status: string) {
  switch (status) {
    case 'DONE': return 'success'
    case 'TODO': return 'warning'
    case 'IN_PROGRESS': return 'default'
    default: return 'default'
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'HIGH': return 'error'
    case 'MED': return 'warning'
    case 'LOW': return 'success'
    default: return 'default'
  }
}

interface TaskCardProps {
    task: Task
}

export function TaskCard({task}: TaskCardProps){
    return(
        <>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                        {task.title}
                    </Typography>

                    {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            {task.description}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1.5, gap: 0.5 }}>
                        <Chip label={task.status} color={getStatusColor(task.status)} size="small" />
                        <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
                    </Stack>

                    <Box sx={{ mt: 'auto' }}>
                        <Divider sx={{ mb: 1.5 }} />

                        <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CalendarTodayIcon fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    Vence: {task.dueDate}
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PersonIcon fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    {task.assigneeId ? `Asignado a ${task.assigneeId}` : 'Sin asignar'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}