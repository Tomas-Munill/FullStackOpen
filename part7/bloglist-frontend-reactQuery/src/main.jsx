import ReactDOM from 'react-dom/client';
import App from './App';
import { AppContextProvider } from './AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AppContextProvider>
);
