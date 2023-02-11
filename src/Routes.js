import Home from "views/Home";
import Login from "views/Login";
import PageNotFound from "views/PageNotFound";
import { Route, Routes as Router } from "react-router-dom";
import LoginedLayout from "views/LoginedLayout";
import ChatGptKeysPage from "views/ChatGPTKeys";
import AddChatGptKeysPage from "views/ChatGPTKeys/Add";
import UsersPage from "views/Users";
import CreateUserPage from "views/Users/Create";

export const locations = {
  home: '/',
  chatgptKeys: '/chatgpt-keys',
  chatgptKeyCreate: '/chatgpt-keys/create',
  users: '/users',
  usersCreate: '/users/create',
  login: '/login',
};

export const breadcrumbs = {
  [locations.home]: [],
  [locations.chatgptKeys]: [
    { name: 'ChatGPT Keys', isActive: true }
  ],
  [locations.chatgptKeyCreate]: [
    { name: 'ChatGPT Keys', link: locations.chatgptKeys },
    { name: 'Add', isActive: true }
  ],
  [locations.users]: [
    { name: 'Users', isActive: true }
  ],
  [locations.usersCreate]: [
    { name: 'Users', link: locations.users },
    { name: 'Create', isActive: true }
  ],
};

const Routes = () => {
  return (
    <Router>
      <Route element={<LoginedLayout />}>
        <Route path={locations.home} element={<Home />} />
        <Route path={locations.chatgptKeys} element={<ChatGptKeysPage />} />
        <Route path={locations.chatgptKeyCreate} element={<AddChatGptKeysPage />} />
        <Route path={locations.users} element={<UsersPage />} />
        <Route path={locations.usersCreate} element={<CreateUserPage />} />
      </Route>
      <Route path={locations.login} element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Router>
  );
};

export default Routes;