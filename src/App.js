import './App.css';
import { RouterProvider } from 'react-router-dom'
import { routes } from './routers/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="container mx-auto">
      <RouterProvider router={routes}></RouterProvider>
      <Toaster/>
    </div>
  );
}

export default App;
