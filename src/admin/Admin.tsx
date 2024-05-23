import { Route, Routes } from "react-router-dom";
import AdminLayout from "./components/app/AdminLayout";
import Dashboard from "./page/Dashboard";
import Data from "./page/Data";
import Login from "./page/Login";
import Assets from "./page/Assets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Admin = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/manager" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="home" element={<Data type="home" title="Baş saypa" />} />
          <Route
            path="about"
            element={<Data type="about" title="Biz barada" />}
          />
          <Route
            path="service"
            element={<Data type="service" title="Biziň hyzmatlarymyz" />}
          />
          <Route
            path="portfolia"
            element={<Data type="portfolia" title="Portfolia" />}
          />
          <Route
            path="other"
            element={<Data type="other" title="Sazlamalar" />}
          />
          <Route
            path="file"
            element={<Assets selectable={false} onSelect={() => {}} />}
          />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default Admin;
