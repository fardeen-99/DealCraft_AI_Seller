import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Dashboard from "./features/game/pages/dashboard"
import GameSession from "./features/game/pages/GameSession"
import Protected from "./features/auth/components/Protected"
import { useEffect } from "react";
import useAuth from "./features/auth/hooks/auth.hook";
import Home from "./home"
import ThemeToggle from "./components/ThemeToggle";

// 🔥 Layout wrapper so ThemeToggle lives INSIDE the router context
function RootLayout() {
  return (
    <>
      <ThemeToggle />
      <Outlet />
    </>
  );
}

function App() {
  const { handleGetme } = useAuth();

  useEffect(() => {
    handleGetme();
  }, []);

  const router = createBrowserRouter([
    {
      element: <RootLayout />,
      children: [
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/dashboard",
          element: <Protected>
            <Dashboard />
          </Protected>
        },
        {
          path: "/game/:sessionId",
          element: <Protected>
            <GameSession />
          </Protected>
        },
        {
          path: "/",
          element: <Home />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
