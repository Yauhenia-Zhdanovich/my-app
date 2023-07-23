import "./App.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<WelcomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
