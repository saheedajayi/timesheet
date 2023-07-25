import {BrowserRouter, Route, Routes} from "react-router-dom"
import LoginPage from "../components/loginPage/index.jsx";
import Dashboard from "../components/dashboard/index.jsx";
import NonAdminTable from "../components/dashboard/NonAdminTable.jsx";
import Protected from "../components/loginPage/Protected.jsx";
import AddEmployeeForm from "../components/dashboard/AddEmployeeForm.jsx";
function RootNavigation(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="dashboard/*" element={<Protected />}>
                    <Route index element={<Dashboard />} />
                    <Route path="info" element={<NonAdminTable />} />
                    <Route path="new-employee" element={<AddEmployeeForm/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}
export default RootNavigation