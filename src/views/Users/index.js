import { locations } from "Routes";
import usersApi from "api/usersApi";
import axios from "axios";
import ButtonRound from "components/Button/ButtonRound";
import CardList from "components/Card/CardList";
import Container from "components/Container/Container";
import { showToastError } from "components/CustomToast/CustomToast";
import Table from "components/Table/Table";
import ActionCell from "components/Table/TableCells/ActionCell";
import BadgeCell from "components/Table/TableCells/BadgeCell";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { COLOR_BADGE, STATUS_USER } from "utils/constant";

const initState = [];

const UsersPage = () => {
  const navigate = useNavigate();
  const loadingRef = useRef(true);
  const [state, setState] = useState(initState);

  const getDataApi = async (source) => {
    try {
      const res = await usersApi.get({
        params: {},
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


  useEffect(() => {
    const source = axios.CancelToken.source();
    getDataApi(source);
    return () => {
      source.cancel('cancel');
    };
  }, []);
  // ----------------------------------------------------------------
  // SEARCHING HELPERS
  // const [name, setName] = useState('');
  // useEffect(() => {
  //   if (loadingRef.current) { return; }
  //   const source = axios.CancelToken.source();
  //   const settimeout = setTimeout(() => {
  //     getDataApi(source);
  //   }, 500);4
  //   return () => {
  //     clearTimeout(settimeout);
  //   };
  // }, [name]);
  // ----------------------------------------------------------------
  const tableColumns = [
    {
      id: 'id',
      Header: () => <div>#</div>,
      Cell: ({ row }) => {
        return <SimpleCell className="text-center" data={+row?.index + 1} />;
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
      id: 'status',
      Header: () => <div className="text-center">Status</div>,
      Cell: ({ row }) => <BadgeCell data={STATUS_USER[row?.original?.status]} color={COLOR_BADGE[row?.original?.status]} />,
    },
    {
      id: 'action',
      Header: () => <div className="text-center">Status</div>,
      Cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-4 pointer-events-none opacity-30">
            <ActionCell
              onEdit={() => {
                navigate(`/users/edit/${row?.original?._id}`);
              }}
              onDelete={() => { }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Container className="" >
      {/* <input value={name} onChange={(e) => {
        setName(e.target.value);
      }} /> */}
      <CardList>
        <div className="flex px-6 py-4">
          <Link to={locations.usersCreate}>
            <ButtonRound
              className="flex items-center font-bold uppercase transition-transform duration-300 transform hover:-translate-y-1"
              color={'primary'}
            >
              <FiPlus size={'1.1rem'} />
              <span className="ml-1">Create</span>
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

export default UsersPage;