import "./App.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import ConversationsPage from "./pages/ConversationsPage";
import {UserProvider} from "./globals/user/UserContext";
import ErrorBoundary from "./components/ErrorBoundary";

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
        <ErrorBoundary>
          <UserProvider>
            <main>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route
                  path="conversations/:id?"
                  element={<ConversationsPage />}
                />
                <Route path="*" element={<WelcomePage />} />
              </Routes>
            </main>
          </UserProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
