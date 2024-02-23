"use client"; 
import { useState, useEffect } from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';

const UpdateTodo = () => {
    const router = useSearchParams()
    const history = useRouter();
 
  const index= router.get('index')
    
    console.log(router, 'router');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<dayjs.Dayjs | null>(null);
    useEffect(() => {
        if (index !==undefined) {
            const storedTodos = localStorage.getItem('todos') || '[]';
            const todos = JSON.parse(storedTodos);
            const todoIndex = Number(index);
             const todo = todos[todoIndex];
             console.log(todo);
             setDescription(todo?.description || '');
             setDate(todo?.date ? dayjs(new Date(todo.date)) : null);
            
        }
    }, [index]);

    const handleUpdateTodo = (indexToUpdate: number) => {
        const storedTodos = localStorage.getItem('todos') || '[]';
        let todos = JSON.parse(storedTodos);
         console.log(description);
         console.log(date);
         
        const todoIndex = todos.findIndex((todo: { id: number }) => todo.id === indexToUpdate);
        console.log(todoIndex);
        todos[todoIndex].description = description;
        todos[todoIndex].date = date?.toISOString() || null;
        localStorage.setItem('todos', JSON.stringify(todos));

        history.push('/');
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
            {index}
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
                    <img src="https://imgs.search.brave.com/7m2cZHEEyK9nEZguEy3TYI78UQ2EtepQymNzxfLUj1c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS95V21ENDVLUWlf/YTV0eUVJdlFzVGVi/RFJiUnUxZnBaTjNi/MUo0QTdYaWlyYlRN/NUI0QlN0d1BuLXdW/ajRHZlpfUVE9dzI0/MC1oNDgwLXJ3" alt="Icon" style={{ width: '30px', marginRight: '10px' }} />
                    <h1 style={{ textAlign: 'center', fontSize: '24px' }}>Update Todo</h1>
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
        value={date} // This is now expected to be a dayjs object or null
        onChange={(newValue) => setDate(newValue)} // newValue is already a dayjs object because of AdapterDayjs
    />
                </LocalizationProvider>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                        variant="contained"
                        onClick={() => handleUpdateTodo(Number(index))}
                    >
                        Update
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTodo;
