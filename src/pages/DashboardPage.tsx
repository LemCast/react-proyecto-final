import LogoutIcon from '@mui/icons-material/Logout'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import ViewListIcon from '@mui/icons-material/ViewList'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ProjectForm } from '../components/ProjectForm'
import { ProjectList } from '../components/ProjectList'
import { useAuth } from '../hooks/useAuth'
import { useProjectForm } from '../hooks/useProjectForm'
import { useProjects } from '../hooks/useProjects'

export function DashboardPage() {
  const { logout, username } = useAuth()
  const navigate = useNavigate()
  const { projects, loading, error, refetch } = useProjects()
  const projectForm = useProjectForm({ onSuccess: () => {refetch(); setCreatingProject(false) } })
  const [creatingProject, setCreatingProject] = useState(false)
  const initial = (username || 'User').trim().slice(0, 1).toUpperCase()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <Box maxWidth="auto" mx="auto" mt={3} px={50}>
      <Stack
  direction="row"
  justifyContent="space-between"
  alignItems="flex-start"
  mb={3}
>
  <Stack spacing={2}>
    <Typography variant="h3">
      Página de proyectos
    </Typography>

    <Stack direction="row" spacing={2}>
      <Button
        startIcon={<CreateNewFolderIcon />}
        onClick={() => setCreatingProject(true)}
      >
        Hacer Proyecto Nuevo
      </Button>

      <Button
        startIcon={<ViewListIcon />}
        onClick={() => navigate('/tasks')}
      >
        Mostrar todas las tareas
      </Button>

      <Button
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </Stack>
  </Stack>

  <Stack
  direction="row"
  alignItems="center"
  spacing={1.5}
  sx={{
    px: 2,
    py: 1,
    borderRadius: 3,
    bgcolor: 'background.paper',
    boxShadow: 1,
    }}
  >
    <Avatar
      sx={{
        width: 48,
        height: 48,
        bgcolor: 'primary.main',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.2rem',
      }}
    >
      {initial}
    </Avatar>

    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontSize: '0.75rem' }}
      >
        Buen dia!
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {username}
      </Typography>
    </Box>
  </Stack>
</Stack>
      {creatingProject && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <ProjectForm {...projectForm} onClose={() => setCreatingProject(false)} />
        </Paper>
      )}

      <Paper sx={{ p: 3 }}>
        <ProjectList
          projects={projects}
          loading={loading}
          error={error}
          onChanged={refetch}
        />
      </Paper>
    </Box>
  )
}