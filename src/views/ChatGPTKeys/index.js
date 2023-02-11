import { locations } from "Routes";
import chatgptKeysApi from "api/chatgptKeysApi";
import ButtonRound from "components/Button/ButtonRound";
import Container from "components/Container/Container";
import Table from "components/Table/Table";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChatGptKeysPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState([]);


  useEffect(() => {
    if (isLoading) {
      const getDataApi = async () => {
        await setLoading(true);
        try {
          const res = await chatgptKeysApi.get({
            params: {},
          });
          await setState(res);
        } catch (e) {
          console.log(e);
        } finally {
          await setLoading(false);
        }
      };
      getDataApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----------
  const tableColumns = [
    {
      id: 'id',
      Header: () => <div>#</div>,
      Cell: ({ row }) => {
        return <SimpleCell className="text-center" data={+row?.index + 1} />;
      },
    },
    {
      id: 'key',
      Header: () => <div className="text-left">Keys</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original} />,
    },
  ];

  return (
    <Container className="max-w-3xl ">
      <div className="">
        <div className="text-sm bg-white rounded-lg shadow-2xl">
          <div className="flex px-6 py-4">
            <Link to={locations.chatgptKeyCreate}>
              <ButtonRound className="flex items-center py-2 font-bold leading-none uppercase transition-transform duration-300 transform border-none bg-primary hover:-translate-y-1">
                <FiPlus size={'1.1rem'} />
                <span className="ml-1">Add keys</span>
              </ButtonRound>
            </Link>
          </div>

          <Table
            isLoading={isLoading}
            columns={tableColumns}
            data={state}
            headCellsClassName="bg-primary font-bold border uppercase"
            bodyCellsClassName="border"
            tableClassName={''}
          // pagination keys
          // totalPage={state?.totalPage}
          // currentPage={state?.currentPage}
          // totalItems={state?.totalItems}
          // onChangePage={handleChangePage}
          />
        </div>
      </div>
    </Container>
  );
};

export default ChatGptKeysPage;