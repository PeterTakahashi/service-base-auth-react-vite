import { Routes, Route } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { SigninPage } from "@/pages/SigninPage";
import { SignupPage } from "@/pages/SIgnupPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProtectedRoute } from "@/components/routes/ProtectedRoute";

const routes = [
  { path: "/", element: <HomePage />, isPrivate: true },
  { path: "/signin", element: <SigninPage />, isPrivate: false },
  { path: "/signup", element: <SignupPage />, isPrivate: false },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    isPrivate: false,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
    isPrivate: false,
  },
];

function App() {
  return (
    <Routes>
      {routes.map((route) => {
        // isPrivate is a boolean that indicates if the route is private or not
        const element = route.isPrivate ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        );
        return <Route key={route.path} path={route.path} element={element} />;
      })}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
