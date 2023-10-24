
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import Layout from './layout/Layout';
import ThemeProvider from './theme/ThemeProvider';
import LocationProvider from './providers/LocationProvider';

function App() {
  return (
   
    <BrowserRouter>
      <ThemeProvider>
        <LocationProvider>
          <Layout>
            <Router/>
          </Layout>
        </LocationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
