
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';
import Layout from './layout/Layout';
import ThemeProvider from './theme/ThemeProvider';
import LocationProvider from './providers/LocationProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
   
    <BrowserRouter basename='/jobApp'>
      <ThemeProvider>
        <LocationProvider>
          <Layout>
            <Router/>
          </Layout>
        </LocationProvider>
        <ToastContainer/>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
