import { locations } from "Routes";
import classNames from "classnames";
import Container from "components/Container/Container";
import { Link } from "react-router-dom";

const Home = () => {

  const MENU_LIST = [
    // {
    //   id: 'user',
    //   width: 'w-full sm:w-1/2',
    //   title: { name: 'Users', link: locations.users },
    //   children: [{ id: 'create', name: 'Create', link: locations.usersCreate }],
    // },
    {
      id: 'api-keys',
      width: 'w-full sm:w-1/2',
      title: { name: 'ChatGPT Keys', link: locations.chatgptKeys },
      children: [{ id: 'create', name: 'Add keys', link: locations.chatgptKeyCreate }],
    },
    
  ];

  return (
    <Container >
      <div className="w-1/2">
        <div className="flex flex-wrap">
          {MENU_LIST.map((item) => (
            <div key={item?.id} className={`flex p-4 ${item?.width}`}>
              <div
                className={classNames(
                  'w-full p-4 transition duration-300 transform rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 bg-black-3',
                  'bg-white',
                )}
              >
                {item?.title?.link ? (
                  <Link to={item?.title?.link}>
                    <h5 className="text-2xl font-bold hover:text-primary">{item?.title?.name}</h5>
                  </Link>
                ) : (
                  <h5 className="text-2xl font-bold">{item?.title?.name}</h5>
                )}
                <div className="mt-2 space-x-4">
                  {item?.children?.map((i) =>
                    i?.link ? (
                      <Link key={i?.id} to={i?.link}>
                        <span className="hover:text-primary hover:underline">{i?.name}</span>
                      </Link>
                    ) : (
                      <span key={i?.id}>{i?.name}</span>
                    ),
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Home;