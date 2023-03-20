import { locations } from "Routes";
import classNames from "classnames";
import Container from "components/Container/Container";
import { Link } from "react-router-dom";

const Home = () => {

  const MENU_LIST = [
    {
      id: 'user',
      width: 'w-full sm:w-1/2 xl:w-1/4',
      title: { name: 'Users', link: locations.users },
      children: [{ id: 'create', name: 'Create', className: 'opacity-0 cursor-default' }],
    },
    {
      id: 'api-keys',
      width: 'w-full sm:w-1/2 xl:w-1/4',
      title: { name: 'ChatGPT Keys', link: locations.chatgptKeys },
      children: [{ id: 'create', name: 'Add keys', link: locations.chatgptKeyCreate }],
    },
    // {
    //   id: 'settings',
    //   width: 'w-full sm:w-1/2 xl:w-1/4',
    //   title: { name: 'Settings', link: locations.settings },
    // },

  ];

  return (
    <Container >
      <div className="flex flex-wrap">
        {MENU_LIST.map((item) => (
          <div key={item?.id} className={` p-4 ${item?.width}`}>
            <div
              className={classNames(
                'w-full  h-full p-4 rounded-lg shadow-lg hover:-translate-y-2 bg-white',
                'transition-all duration-300 transform'
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
                    <Link key={i?.id} to={i?.link} className={i?.className}>
                      <span className="hover:text-primary hover:underline">{i?.name}</span>
                    </Link>
                  ) : (
                    <span key={i?.id} className={i?.className}>{i?.name}</span>
                  ),
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;