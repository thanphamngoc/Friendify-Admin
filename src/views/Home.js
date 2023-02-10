import Logout from "modules/Logout";

const Home = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between p-4 bg-white">
        <p>Homepage</p>
        <Logout />
      </div>
    </div>
  );
};

export default Home;