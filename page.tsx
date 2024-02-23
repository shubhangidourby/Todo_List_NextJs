import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AdbIcon from '@mui/icons-material/Adb';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
    const [todos, setTodos] = useState<{ description: string; date: string }[]>([]);
    const router = useRouter();

    const handleDelete = (index: number) => {
        const updatedTodos = [...todos];
        updatedTodos.splice(index, 1);
        setTodos(updatedTodos);
        if (typeof window !== 'undefined') {
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedTodos = localStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        }
    }, []);

    const handleAdd = () => {
        router.push('/add');
    };

    const handleEdit = (index: number) => {
        console.log(index)
        router.push(`/edit?index=${index}`);
    };

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#800080' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#800080',
                                textDecoration: 'none',
                            }}
                        >
                            
                        </Typography>

                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'flex' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 800,
                                letterSpacing: '.3rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            LIST YOUR TODO'S
                        </Typography>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Todo-List App">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="https://imgs.search.brave.com/j87JDH40RYKam6HGnv0hxnBkxTmpFbvYHecKl0Jboyc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8zMTc2LzMxNzYz/NjYucG5n" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    sx={{
                        mt: 5,
                        ml: 4,
                        flexGrow: 1,
                        width: '50px',
                    }}
                    variant="contained"
                    onClick={handleAdd}
                >
                    Add Todo
                </Button>
            </div>
            <table style={{ backgroundColor: 'pink', width: '80%', margin: 'auto', marginTop: '20px' }}>
                <tbody>
                    {todos.map((todo, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td style={{ textAlign: 'left', padding: '8px' }}>
                                    {todo.description}
                                </td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    {todo.date}
                                </td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                                <td style={{ textAlign: 'center', padding: '8px' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                               
                            </tr>
                            <tr>
                                <td colSpan={3} style={{ borderBottom: '1px solid white' }}></td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
