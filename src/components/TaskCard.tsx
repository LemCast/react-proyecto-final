import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import type { Task } from '../types'
import { useTaskActions } from '../hooks/useTaskActions'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import type { SelectChangeEvent } from '@mui/material/Select'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

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

function getNextStatus(current: string): string {
    const order = ['TODO', 'IN_PROGRESS', 'DONE']
    const currentIndex = order.indexOf(current)
    return order[(currentIndex + 1) % order.length]
}

interface TaskCardProps {
    task: Task
    onChanged: () => void
}

export function TaskCard({ task, onChanged }: TaskCardProps) {
    const actions = useTaskActions({
        task,
        onSuccess: onChanged,
    })

    function confirmDelete() {
        const confirmed = window.confirm(
            `¿Eliminar la tarea "${task.title}"?`,
        )

        if (confirmed) {
            void actions.handleDelete()
        }
    }

    return (
        <>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} variant="elevation">
                <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="flex-end">
                        <Tooltip title="Editar tarea">
                            <span>
                                <IconButton size="small" color="primary" onClick={actions.startEditing} disabled={actions.busy}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>

                        <Tooltip title="Eliminar tarea">
                            <span>
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={confirmDelete}
                                    disabled={actions.busy}
                                    aria-label="Eliminar tarea"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </Stack>
                    <Divider sx={{ mb: 1.5 }} />
                    <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                        {task.title}
                    </Typography>

                    {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            {task.description}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1.5, gap: 0.5 }}>
                        <Chip
                            label={actions.status}
                            color={getStatusColor(actions.status)}
                            size="small"
                            onClick={() => actions.handlePatch(getNextStatus(actions.status))}
                            sx={{ cursor: 'pointer' }}
                        />
                        <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" />
                    </Stack>

                    <Box sx={{ mt: 'auto' }}>
                        <Divider sx={{ mb: 1.5 }} />

                        <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CalendarTodayIcon fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    Vence: {task.dueDate}
                                </Typography>
                            </Stack>

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <PersonIcon fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    {task.assigneeId ? `Asignado a ID ${task.assigneeId}` : 'Sin asignar'}
                                </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <CreateNewFolderIcon fontSize="small" color="action" />
                                <Typography variant="caption" color="text.secondary">
                                    {task.projectId ? `Project ID ${task.projectId}` : 'Sin proyecto'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={actions.editing} onClose={actions.cancelEditing} fullWidth maxWidth="sm">
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box
                            component="form"
                            onSubmit={actions.handleUpdate}
                        >
                            <Stack spacing={2}>
                                <Typography variant="subtitle1">Editar tarea #{task.id}</Typography>

                                {actions.error && <Alert severity="error">{actions.error}</Alert>}

                                <TextField
                                    label="Nombre"
                                    value={actions.title}
                                    onChange={(event) => actions.setTitle(event.target.value)}
                                    required
                                    fullWidth
                                    helperText="Entre 3 y 120 caracteres"
                                    inputProps={{ minLength: 3, maxLength: 120 }}
                                />

                                <TextField
                                    label="Descripción"
                                    value={actions.description}
                                    onChange={(event) => actions.setDescription(event.target.value)}
                                    fullWidth
                                    multiline
                                    rows={2}
                                />

                                <Select
                                    value={actions.status}
                                    label="Estado"
                                    onChange={(e: SelectChangeEvent<string>) => {
                                        actions.setStatus(e.target.value)
                                    }}
                                >
                                    <MenuItem value="TODO">Pendiente</MenuItem>
                                    <MenuItem value="IN_PROGRESS">En progreso</MenuItem>
                                    <MenuItem value="DONE">Completada</MenuItem>
                                </Select>
                                <Select
                                    value={actions.priority}
                                    label="Prioridad"
                                    onChange={(e: SelectChangeEvent<string>) => actions.setPriority(e.target.value)}
                                    required
                                >
                                    <MenuItem value="LOW">Baja</MenuItem>
                                    <MenuItem value="MED">Media</MenuItem>
                                    <MenuItem value="HIGH">Alta</MenuItem>
                                </Select>
                                <DatePicker
                                    label="Fecha de vencimiento"
                                    value={actions.dueDate ? dayjs(actions.dueDate) : null}
                                    onChange={(newValue) => actions.setDueDate(newValue ? newValue.format('YYYY-MM-DD') : '')}
                                    minDate={dayjs()}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                                <TextField
                                    label="Asignado a"
                                    value={actions.assigneeId ?? ''}
                                    onChange={(e) => actions.setAssigneeId(e.target.value ? parseInt(e.target.value, 10) : null)}
                                    fullWidth
                                />
                                <TextField
                                    label="Project ID"
                                    value={actions.projectId}
                                    disabled
                                    fullWidth
                                />

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        startIcon={<SaveIcon />}
                                        disabled={!actions.valid || actions.busy}
                                    >
                                        {actions.saving ? 'Guardando…' : 'Guardar cambios'}
                                    </Button>

                                    <Button
                                        type="button"
                                        startIcon={<CloseIcon />}
                                        onClick={actions.cancelEditing}
                                        disabled={actions.busy}
                                    >
                                        Cancelar
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </LocalizationProvider>
                </DialogContent>
            </Dialog>
        </>
    )
}