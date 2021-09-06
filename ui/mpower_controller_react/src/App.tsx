import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import { Container, createTheme, CssBaseline } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005173'
    }
  }
});

function App(): JSX.Element {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header
            title="React MPower Controller"
            routes={[]}
          />
        </ThemeProvider>
        <Container maxWidth="xl">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
      </Router>      
    </div>
  );
}

export default App;
