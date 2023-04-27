import { locations } from "Routes";
import usersApi from "api/usersApi";
import axios from "axios";
import ButtonRound from "components/Button/ButtonRound";
import CardList from "components/Card/CardList";
import Container from "components/Container/Container";
import { showToastError } from "components/CustomToast/CustomToast";
import InputSearchAutoChangeParams from "components/Input/InputSearchAutoChangeParams";
import Table from "components/Table/Table";
import SelectCell from "components/Table/TableCells/SelectCell";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useSearchParams } from "react-router-dom";
import { ROW_PER_PAGE, SELECT_STATUS_USER, STATUS_USER } from "utils/constant";

const UsersPage = () => {
  const [searchParams] = useSearchParams();
  const paramsPage = searchParams.get('page');
  const paramsTextSearch = searchParams.get('textSearch');

  const loadingRef = useRef(true);
  const [state, setState] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getDataApi = async () => {
      try {
        const params = {
          textSearch: paramsTextSearch,
          rowPerPage: ROW_PER_PAGE,
          page: +paramsPage || 1,
        };
        const res = await usersApi.get({
          params,
          cancelToken: source.token,
        });
        setState(res);
      } catch (e) {
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
  }, [paramsPage, paramsTextSearch]);

  const handleChangeUserStatus = async (row, selectObj) => {
    try {
      await usersApi.edit(row?.original?._id, { status: STATUS_USER?.[selectObj?.key] });
      setState({
        ...state, data: state?.data?.map((item) => {
          if (item._id === row?.original?._id) {
            return {
              ...item,
              status: STATUS_USER[selectObj.key]
            };
          }
          return item;
        })
      });
    } catch (e) {
      console.log(e);
      showToastError('', 'Something went wrong');
    }
  };
  // ----------------------------------------------------------------
  const tableColumns = [
    {
      id: 'id',
      Header: () => <div>#</div>,
      Cell: ({ row }) => {
        return <SimpleCell className="text-center" data={`${ROW_PER_PAGE * (state.currentPage - 1) + row?.index + 1}`} />;
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
      Cell: ({ row }) => (
        <SelectCell
          selected={SELECT_STATUS_USER.find((item) => item.name === row?.original?.status)}
          list={SELECT_STATUS_USER}
          onChange={(selectObj) => { handleChangeUserStatus(row, selectObj); }}
        />
      ),
    },
  ];

  return (
    <Container className="" >
      <CardList>
        <div className="flex justify-between px-6 py-4">
          <Link to={locations.usersCreate} className="opacity-0 pointer-events-none">
            <ButtonRound
              className="flex items-center font-bold uppercase transition-transform duration-300 transform hover:-translate-y-1"
              color="primary"
              disabled
            >
              <FiPlus size={'1.1rem'} />
              <span className="ml-1">Create</span>
            </ButtonRound>
          </Link>
          <InputSearchAutoChangeParams paramName="textSearch" />
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
    </Container>
  );
};

export default UsersPage;