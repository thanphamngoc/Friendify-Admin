/* eslint-disable react/jsx-key */
import TablePagination from 'components/Pagination/TablePagination';
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { HiOutlineDocumentSearch } from 'react-icons/hi';
import classNames from 'classnames';
import SpinnerLoading from 'components/SpinnerLoading';
import { useSearchParams } from 'react-router-dom';

//----------------------------------------------------------------
// * IF HAVE ON-CHANGE-PAGE PROPS, THIS TABLE COMPONENT WILL NOT AUTO CHANGE PAGE PARAM
// * WE CAN HANDLE AFTER AUTO CHANGE PAGE PARAM BY ON-AFTER-CHANGE-PAGE PROPS
//----------------------------------------------------------------
const Table = ({
  isLoading,
  data,
  columns,
  headCellsClassName,
  bodyCellsClassName,
  tableClassName,
  totalPage,
  currentPage,
  totalItems,
  onChangePage,
  onAfterChangePage,
}) => {
  const _data = React.useMemo(() => data, [data]);
  const _columns = React.useMemo(() => columns, [columns]);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, visibleColumns } = useTable({
    columns: _columns || [],
    data: _data || [],
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangePage = async (page) => {
    searchParams.set('page', page);
    setSearchParams(searchParams);
    onAfterChangePage(page);
  };

  return (
    <>
      <div className="pb-4 overflow-x-auto overflow-y-visible">
        <table className={classNames(tableClassName, 'min-w-full min-h-4xs')} {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups?.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup?.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup?.headers?.map((column) => (
                      // Apply the header cell props
                      <th
                        scope="col"
                        className={`p-4 whitespace-nowrap ${headCellsClassName || ''} `}
                        {...column?.getHeaderProps()}
                      >
                        {
                          // Render the header
                          column?.render('Header')
                        }
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()} className="relative">
            {
              // Table rows is loading
              isLoading && (
                <tr className="h-12 border">
                  <td>
                    <div
                      className={`absolute w-full h-full top-0 left-0 z-1 flex items-center justify-center`}
                    >
                      <SpinnerLoading className="h-8 text-primary" />
                    </div>
                  </td>
                </tr>
              )
            }
            {
              // Loop over the table rows
              rows?.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row?.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row?.cells?.map((cell) => {
                        // Apply the cell props
                        return (
                          <td
                            colSpan={0}
                            className={`p-4 whitespace-nowrap ${bodyCellsClassName || ''}`}
                            {...cell?.getCellProps()}
                          >
                            {
                              // Render the cell contents
                              cell?.render('Cell')
                            }
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
            {
              // Table no data
              !isLoading && rows?.length === 0 && (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    <div className={'w-full flex justify-center items-center py-4 text-center'}>
                      <HiOutlineDocumentSearch size={'2rem'} className="mr-2" />
                      No data found
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <TablePagination
        key={currentPage}
        pageCount={totalPage}
        onChangePage={onChangePage || handleChangePage}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </>
  );
};

Table.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  headCellsClassName: PropTypes.string,
  bodyCellsClassName: PropTypes.string,
  tableClassName: PropTypes.string,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
  onAfterChangePage: PropTypes.func,
};

Table.defaultProps = {
  isLoading: false,
  data: [],
  columns: [],
  headCellsClassName: '',
  bodyCellsClassName: '',
  tableClassName: '',
  totalPage: 0,
  currentPage: 0,
  totalItems: 0,
  onAfterChangePage: () => { },
};

export default Table;
