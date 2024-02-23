import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddTodo = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const todos = JSON.parse(storedTodos);
      const foundTodo = todos.find((todo: { description: string, date: string }) => todo.description === description && dayjs(todo.date).isSame(date, 'day'));
      if (foundTodo) {
        setShowSnackbar(true);
      }
    }
  }, [description, date]);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleAddTodo = () => {
    const newTodo = { description, date };
    const storedTodos = localStorage.getItem('todos') || '[]';
    const todos = JSON.parse(storedTodos);
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));

    
    router.push('/');
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundImage: 'url("https://imgs.search.brave.com/0WKXMvIDRJxoQgjYgW-nbXavzmXHhtVZuxSVAyVxkek/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jaGVj/a2lmeS5jb20vd3At/Y29udGVudC91cGxv/YWRzL2Rlc2lnbi0x/Nng5LTQyLTEud2Vi/cA")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
   
      <div style={{ 
        backgroundColor: '#e1bee7', 
        padding: '20px', 
        borderRadius: '15px',
        border: '2px solid #ff69b4',
        transition: 'border-color 0.3s, transform 0.3s', 
        cursor: 'pointer', 
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
        }}>
         <div style={{ display: 'flex',justifyContent: 'center',  alignItems: 'center', marginBottom: '20px' }}>
          <img src="https://imgs.search.brave.com/7m2cZHEEyK9nEZguEy3TYI78UQ2EtepQymNzxfLUj1c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS95V21ENDVLUWlf/YTV0eUVJdlFzVGVi/RFJiUnUxZnBaTjNi/MUo0QTdYaWlyYlRN/NUI0QlN0d1BuLXdW/ajRHZlpfUVE9dzI0/MC1oNDgwLXJ3" alt="Icon" style={{ width: '30px', marginRight: '10px' }} /> {/* Replace with your image path */}
          <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Add Todo</h1>
        </div>
        <TextField
          style={{ marginBottom: '20px', width: '100%' }}
          id="outlined-basic"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker 
            label="Due Date" 
            value={date} 
            onChange={(newValue: Date | null) => setDate(newValue)} 
          />
        </LocalizationProvider>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </div>
        
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="info">
            Todo with the same description and date already exists!
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
};

export default AddTodo;

