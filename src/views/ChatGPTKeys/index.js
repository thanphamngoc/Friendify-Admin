import { locations } from "Routes";
import chatgptKeysApi from "api/chatgptKeysApi";
import axios from "axios";
import ButtonRound from "components/Button/ButtonRound";
import CardList from "components/Card/CardList";
import Container from "components/Container/Container";
import { showToastError } from "components/CustomToast/CustomToast";
import Table from "components/Table/Table";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChatGptKeysPage = () => {
  const loadingRef = useRef(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const res = await chatgptKeysApi.get({
          params: {},
          cancelToken: source.token
        });
        setState(res);
      } catch (e) {
        console.log(e);
        if (e.message !== 'cancel') {
          showToastError(e.message);
        }
        setState([]);
      } finally {
        loadingRef.current = false;
      }
    };
    getDataApi();
    return () => {
      source.cancel('cancel');
    };
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
      <CardList>
        <div className="flex px-6 py-4">
          <Link to={locations.chatgptKeyCreate}>
            <ButtonRound
              className="flex items-center font-bold uppercase transition-transform duration-300 transform hover:-translate-y-1"
              color="primary"
            >
              <FiPlus size={'1.1rem'} />
              <span className="ml-1">Add keys</span>
            </ButtonRound>
          </Link>
        </div>

        <Table
          isLoading={loadingRef.current}
          columns={tableColumns}
          data={state}
          headCellsClassName="bg-primary text-white font-bold border uppercase"
          bodyCellsClassName="border"
          tableClassName={''}
        // pagination keys
        // totalPage={state?.totalPage}
        // currentPage={state?.currentPage}
        // totalItems={state?.totalItems}
        // onChangePage={handleChangePage}
        />
      </CardList>
    </Container>
  );
};

export default ChatGptKeysPage;