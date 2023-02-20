import { locations } from "Routes";
import discussionApi from "api/discussionApi";
import axios from "axios";
import ButtonRound from "components/Button/ButtonRound";
import CardList from "components/Card/CardList";
import Container from "components/Container/Container";
import { showToastError } from "components/CustomToast/CustomToast";
import InputSearchAutoChangeParams from "components/Input/InputSearchAutoChangeParams";
import ModalConfirm from "components/Modal/ModalConfirm";
import Table from "components/Table/Table";
import ActionCell from "components/Table/TableCells/ActionCell";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ROW_PER_PAGE } from "utils/constant";

const initState = [];

const DiscussionPage = () => {
  const [searchParams] = useSearchParams();
  const paramsPage = searchParams.get('page');
  const paramsTextSearch = searchParams.get('textSearch');

  const navigate = useNavigate();
  const loadingRef = useRef(true);
  const [state, setState] = useState(initState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const res = await discussionApi.get({
          params: {
            textSearch: paramsTextSearch,
            rowPerPage: ROW_PER_PAGE,
            page: +paramsPage || 1
          },
          cancelToken: source.token,
        });
        setState(res);
      } catch (e) {
        if (e.message !== 'cancel') {
          showToastError(e.message);
        }
        setState([...initState]);
      } finally {
        loadingRef.current = false;
      }
    };

    getDataApi();
    return () => {
      source.cancel('cancel');
    };
  }, [paramsPage, paramsTextSearch]);

  // ----------------------------------------------------------------
  // HANDLE DELETE METHODS
  const [deleteItem, setDeteteItem] = useState();

  const handleDelete = async () => {
    if (deleteItem?._id) {
      try {
        await discussionApi.delete(deleteItem?._id);

        const res = await discussionApi.get({
          params: {
            textSearch: paramsTextSearch,
            rowPerPage: ROW_PER_PAGE,
            page: state.currentPage
          },
        });
        setState(res);
        setDeteteItem();
      } catch (e) {
        console.log(e.message);
        showToastError(e.message);
      }
    }
  };

  const tableColumns = [
    {
      id: 'id',
      Header: () => <div>#</div>,
      Cell: ({ row }) => {
        return <SimpleCell className="text-center" data={`${ROW_PER_PAGE * (state.currentPage - 1) + row?.index + 1}`} />;
      },
    },
    {
      id: 'description',
      Header: () => <div className="text-left">description</div>,
      Cell: ({ row }) => (
        <Link to={`/discussion/${row?.original?._id}`}>
          <SimpleCell
            className="font-bold text-left truncate max-w-prose"
            data={row?.original?.description}
          />
        </Link>
      ),
    },
    {
      id: 'creator',
      Header: () => <div className="text-left">Creator</div>,
      Cell: ({ row }) => (
        <SimpleCell
          className="text-left"
          data={row?.original?.creator?.fullName}
          onClick={() => { navigate(`/discussion/${row?.original?._id}`); }}
        />
      ),
    },
    {
      id: 'type',
      Header: () => <div className="text-center">Type</div>,
      Cell: ({ row }) => <SimpleCell className="text-center" data={row?.original?.type} />,
    },
    {
      id: 'child',
      Header: () => <div className="text-right">Comments</div>,
      Cell: ({ row }) => <SimpleCell className="text-right" data={row?.original?.child} />,
    },

    {
      id: 'action',
      Header: () => <div className="text-center"></div>,
      Cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-4">
            <ActionCell
              onDelete={() => { setDeteteItem(row?.original); }}
            />
          </div>
        );
      },
    },
  ];


  return (
    <Container className="" >
      <CardList>
        <div className="flex justify-between px-6 py-4">
          <Link to={locations.discussionCreate} className="opacity-0 pointer-events-none">
            <ButtonRound
              className="flex items-center font-bold uppercase transition-transform duration-300 transform hover:-translate-y-1"
              color="primary"
              disabled
            >
              <FiPlus size={'1.1rem'} />
              <span className="ml-1">Create</span>
            </ButtonRound>
          </Link>
          <InputSearchAutoChangeParams paramName='textSearch' />
        </div>

        <Table
          isLoading={loadingRef.current}
          columns={tableColumns}
          data={state?.data}
          headCellsClassName="bg-primary text-white font-bold border uppercase"
          bodyCellsClassName="border"
          tableClassName={''}
          totalPage={state?.totalPage}
          currentPage={state?.currentPage}
          totalItems={state?.totalItems}
        />
      </CardList>
      {deleteItem?._id && (
        <ModalConfirm
          open
          onConfirm={handleDelete}
          onCancel={() => setDeteteItem()}
          onClose={() => setDeteteItem()}
          title={'Delete Discussion'}
        >
          Are you sure you want to delete this discussion?
        </ModalConfirm>
      )}
    </Container>
  );
};

export default DiscussionPage;