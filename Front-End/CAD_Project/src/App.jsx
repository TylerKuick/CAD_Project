import { useState } from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material'; 
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <AppBar position="static" className="AppBar">
        <Container>
          <Toolbar disableGutters={true} sx={{ justifyContent: 'space-between' }}>
            <Link to="/">
              <Typography variant="h6" component="div">
                NYP Lost & Found
              </Typography>
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Link to="/">
                <Typography>Home</Typography>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
