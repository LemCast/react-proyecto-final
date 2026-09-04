import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

interface ProjectFormProps {
  name: string
  setName: (value: string) => void
  description: string
  setDescription: (value: string) => void
  submitting: boolean
  error: string | null
  valid: boolean
  handleSubmit: (e: React.FormEvent) => void
  onClose: () => void
}

export function ProjectForm({
  name,
  setName,
  description,
  setDescription,
  submitting,
  error,
  valid,
  handleSubmit,
  onClose,
}: ProjectFormProps) {
  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Nuevo proyecto</Typography>
        <IconButton onClick={onClose} size="small" aria-label="Cerrar formulario">
          <CloseIcon />
        </IconButton>
      </Stack>

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <Button type="submit" variant="contained" disabled={!valid || submitting}>
        {submitting ? 'Creando…' : 'Crear proyecto'}
      </Button>
    </Stack>
  )
}