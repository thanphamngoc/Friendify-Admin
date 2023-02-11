import { locations } from "Routes";
import usersApi from "api/usersApi";
import ButtonRound from "components/Button/ButtonRound";
import Container from "components/Container/Container";
import Table from "components/Table/Table";
import ActionCell from "components/Table/TableCells/ActionCell";
import ActivateCell from "components/Table/TableCells/ActivateCell";
import BadgeCell from "components/Table/TableCells/BadgeCell";
import SimpleCell from "components/Table/TableCells/SimpleCell";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { COLOR_BADGE, STATUS_USER } from "utils/constant";

const UsersPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState([
    {
      "_id": "63e601ad7d120310b03a6517",
      "fullName": "Admin 00",
      "email": "admin@mail.com",
      "role": "ADMIN",
      "status": "ACTIVE",
      "referralId": "w8NiQFM",
      "rate": 1
    }
  ]);


  useEffect(() => {
    if (isLoading) {
      const getDataApi = async () => {
        await setLoading(true);
        try {
          const res = await usersApi.get({
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
        console.log(row)
        return (
          <div className="flex justify-center space-x-4 pointer-events-none opacity-30">
            <ActionCell
              onEdit={() => {
                navigate(`/users/edit/${row?.original?._id}`);
              }}
              onDelete={() => {}}
            />
          </div>
        );
      },
    },
  ];

  return (
    <Container className="">
      <div className="">
        <div className="text-sm bg-white rounded-lg shadow-2xl">
          <div className="flex px-6 py-4">
            <Link to={locations.usersCreate}>
              <ButtonRound className="flex items-center py-2 font-bold leading-none uppercase transition-transform duration-300 transform border-none bg-primary hover:-translate-y-1">
                <FiPlus size={'1.1rem'} />
                <span className="ml-1">Create</span>
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

export default UsersPage;