import { locations } from "Routes";
import usersApi from "api/usersApi";
import axios from "axios";
import ButtonRound from "components/Button/ButtonRound";
import CardList from "components/Card/CardList";
import Container from "components/Container/Container";
import { showToastError } from "components/CustomToast/CustomToast";
import InputSearch from "components/Input/InputSearch";
import Table from "components/Table/Table";
import ActionCell from "components/Table/TableCells/ActionCell";
import BadgeCell from "components/Table/TableCells/BadgeCell";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { COLOR_BADGE, STATUS_USER } from "utils/constant";

const initState = [];

const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsPage = searchParams.get('page');
  const paramsTextSearch = searchParams.get('textSearch');

  const navigate = useNavigate();
  const inputSearchTimeoutRef = useRef();
  const loadingRef = useRef(true);
  const [state, setState] = useState(initState);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const res = await usersApi.get({
          params: {
            textSearch: paramsTextSearch || '',
            // rowPerPage: 1,
            page: +paramsPage || 1
          },
          cancelToken: source.token,
          // cancelToken: sourceRef.current.token,
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

  const handleChangePage = async (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  const handleChangeTextSearch = (e) => {
    clearTimeout(inputSearchTimeoutRef.current);
    inputSearchTimeoutRef.current = setTimeout(() => {
      searchParams.set('textSearch', e.target.value);
      setSearchParams(searchParams);
    }, 500);
  };
  // ----------------------------------------------------------------
  const tableColumns = [
    {
      id: 'id',
      Header: () => <div>#</div>,
      Cell: ({ row }) => {
        return <SimpleCell className="text-center" data={`...${row?.original?._id?.slice(-5)}`} />;
      },
    },
    {
      id: 'name',
      Header: () => <div className="text-left">Fullname</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original?.fullName} />,
    },
    {
      id: 'email',
      Header: () => <div className="text-left">Email</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original?.email} />,
    },
    {
      id: 'role',
      Header: () => <div className="text-left">Role</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original?.role} />,
    },
    {
      id: 'referralId',
      Header: () => <div className="text-left">Ref</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original?.referralId} />,
    },
    {
      id: 'inviterReferralId',
      Header: () => <div className="text-left">Inviter-Ref</div>,
      Cell: ({ row }) => <SimpleCell className="text-left" data={row?.original?.inviterReferralId} />,
    },
    {
      id: 'totalRefDaily',
      Header: () => <div className="text-center">Ref-Daily</div>,
      Cell: ({ row }) => <SimpleCell className="text-right" data={row?.original?.totalRefDaily} />,
    },
    {
      id: 'status',
      Header: () => <div className="text-center">Status</div>,
      Cell: ({ row }) => <BadgeCell data={STATUS_USER[row?.original?.status]} color={COLOR_BADGE[row?.original?.status]} />,
    },
    {
      id: 'action',
      Header: () => <div className="text-center">Status</div>,
      Cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-4">
            <ActionCell
              onEdit={() => {
                navigate(`/users/edit/${row?.original?._id}`);
              }}
              // onDelete={() => { }}
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
          <Link to={locations.usersCreate} className="pointer-events-none">
            <ButtonRound
              className="flex items-center font-bold uppercase transition-transform duration-300 transform hover:-translate-y-1"
              color="primary"
              disabled
            >
              <FiPlus size={'1.1rem'} />
              <span className="ml-1">Create</span>
            </ButtonRound>
          </Link>
          <div>
            <InputSearch
              defaultValue={paramsTextSearch}
              onChange={handleChangeTextSearch}
            />
          </div>
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
          onChangePage={handleChangePage}
        />
      </CardList>
    </Container>
  );
};

export default UsersPage;