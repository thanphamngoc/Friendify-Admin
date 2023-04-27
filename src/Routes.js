import Home from "views/Home";
import Login from "views/Login";
import PageNotFound from "views/PageNotFound";
import { Route, Routes as Router } from "react-router-dom";
import LoginedLayout from "views/LoginedLayout";
import UsersPage from "views/Users";
import CreateUserPage from "views/Users/Create";
import MyAccountPage from "views/MyAccount";
import SettingsPage from "views/Settings";

export const locations = {
  home: '/',
  users: '/users',
  usersCreate: '/users/create',
  usersEdit: '/users/edit/:id',
  settings: '/settings',
  login: '/login',
  account: '/account',
};

export const breadcrumbs = {
  [locations.home]: [],
  [locations.users]: [
    { name: 'Users', isActive: true }
  ],
  [locations.usersCreate]: [
    { name: 'Users', link: locations.users },
    { name: 'Create', isActive: true }
  ],
  [locations.usersEdit]: [
    { name: 'Users', link: locations.users },
    // { paramKey: 'id', isActive: true }
    { name: 'Edit', isActive: true }
  ],
  [locations.account]: [
    { name: 'My account', isActive: true }
  ],
  [locations.settings]: [
    { name: 'Settings', isActive: true }
  ],
};

const Routes = () => {
  return (
    <Router>
      <Route element={<LoginedLayout />}>
        <Route path={locations.home} element={<Home />} />

        <Route path={locations.users} element={<UsersPage />} />
        <Route path={locations.usersCreate} element={<CreateUserPage />} />
        <Route path={locations.usersEdit}  element={<CreateUserPage />} />

        <Route path={locations.settings} element={<SettingsPage />} />

        <Route path={locations.account} element={<MyAccountPage />} />
      </Route>
      <Route path={locations.login} element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;