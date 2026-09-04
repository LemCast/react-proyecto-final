import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'



interface TaskFormProps {
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  status:string
  setStatus: (value: string) => void
  priority:string
  setPriority: (value: string) => void
  asigneeId: number | null
  setAsigneeId: (value: number | null) => void
  dueDate: string
  setDueDate: (value: string) => void
  projectId:number
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export function TaskForm({
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
    priority,
    setPriority,
    asigneeId,
    setAsigneeId,
    dueDate,
    setDueDate,
    projectId,
    submitting,
    error,
    valid,
    handleSubmit,
    onClose,
}: TaskFormProps) {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Nueva tarea</Typography>
                  <IconButton onClick={onClose} size="small" aria-label="Cerrar formulario">
                      <CloseIcon />
                  </IconButton>
              </Stack>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                  label="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                  helperText="Mínimo 3 caracteres"
              />
              <TextField
                  label="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
              />
              <Select
                  value={status}
                  label="Estado"
                  onChange={(e: SelectChangeEvent<string>) => setStatus(e.target.value)}
              >
                  <MenuItem value="TODO">Pendiente</MenuItem>
                  <MenuItem value="IN_PROGRESS">En progreso</MenuItem>
                  <MenuItem value="DONE">Completada</MenuItem>
              </Select>
              <Select
                  value={priority}
                  label="Prioridad"
                  onChange={(e: SelectChangeEvent<string>) => setPriority(e.target.value)}
                  required
              >
                  <MenuItem value="LOW">Baja</MenuItem>
                  <MenuItem value="MED">Media</MenuItem>
                  <MenuItem value="HIGH">Alta</MenuItem>
              </Select>
              <DatePicker
                  label="Fecha de vencimiento"
                  value={dueDate ? dayjs(dueDate) : null}
                  onChange={(newValue) => setDueDate(newValue ? newValue.format('YYYY-MM-DD') : '')}
                  minDate={dayjs()}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
              />
              <TextField
                  label="Asignado a"
                  value={asigneeId ?? ''}
                  onChange={(e) => setAsigneeId(e.target.value ? parseInt(e.target.value, 10) : null)}
                  fullWidth
              />
              <TextField
                  label="Project ID"
                  value={projectId}
                  disabled
                  fullWidth
              />
              <Button type="submit" variant="contained" disabled={!valid || submitting}>
                  {submitting ? 'Creando…' : 'Crear tarea'}
              </Button>
          </Stack>
      </LocalizationProvider>
  )
}
