import Login from "modules/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-screen max-w-xl py-8 bg-white border rounded-xl">
        <div className="text-center"><h1 className="text-2xl font-bold "> VoiceGPT </h1></div>
        <Login />
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
