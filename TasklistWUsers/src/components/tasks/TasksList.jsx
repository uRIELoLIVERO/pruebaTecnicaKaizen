import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles';
import { getTasks, createTask, deleteTask, updateTask } from '../../api/tasksApi';
import { Link as RouterLink} from 'react-router-dom'

const TaskContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: '8px',
  border: '1px solid transparent', 
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  transition: 'border 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.default,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  '& *': {
    color: theme.palette.text.primary,
    transition: 'color 0.3s ease',
  },
}));

const StyledListItem = styled(ListItem)(() => ({
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const TaskListContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: 4,
  backgroundImage:
    'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

const TasksList = () => {
  const [tasks, setTasks] = React.useState([]);
  const [newTask, setNewTask] = React.useState('');

  React.useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data.body);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== '') {
      try {
        const response = await createTask({ title: newTask });
        const tasksArray = tasks.body || [];
        if (Array.isArray(tasksArray)) {
          setTasks(prevTasks => [...prevTasks, response.data]);
        } else {
          setTasks([response.data]);
        }
        setNewTask('');
        fetchTasks()
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleUpdateTaskStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await updateTask(id, newStatus)
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
  }

  return (
      <TaskListContainer>
        <TaskContainer>
          <Typography variant="h4" component="h1" gutterBottom>
            Lista de Tareas
          </Typography>
          <Typography>
                Do you want?{' '}
                <span>
                  <RouterLink onClick={handleSignOut} to="/" style={{ color: 'inherit', textDecoration: 'underline' }}>
                    Sign out
                  </RouterLink>
                </span>
              </Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Nueva tarea"
              sx={{ bgcolor: 'background.paper', color: 'text.primary' }}
            />
            <Button variant="contained" onClick={handleAddTask} sx={{ ml: 1 }}>
              Añadir
            </Button>
          </Box>
            <List>
              {tasks && Array.isArray(tasks) ? (
                tasks.map((task) => (
                  <StyledCard key={task.id}>
                    <StyledListItem dense onClick={() => handleUpdateTaskStatus(task.id, task.status)}>
                      <ListItemText 
                        primary={task.title} 
                        style={{ 
                          textDecoration: task.status ? 'line-through' : 'none',
                          color: task.status ? '#b0bec5' : '#ffffff'
                        }}
                      />
                      <ListItemSecondaryAction>
                        {task.status && (
                          <IconButton edge="end" aria-label="completed">
                            <CheckIcon />
                          </IconButton>
                        )}
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </StyledListItem>
                  </StyledCard>
                ))
              ) : (
                <p>No tasks available</p>
              )}
            </List>
        </TaskContainer>
      </TaskListContainer>
  );
};

export default TasksList;
