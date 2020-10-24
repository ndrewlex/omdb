import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Table as TableBootstrap } from 'reactstrap';

const Wrapper = styled.div``;

const TableWrapper = styled(TableBootstrap)``;

const THead = styled.thead``;

const TBody = styled.tbody``;

const TableInfo = styled.div`
  color: #ccc;
  text-align: center;
  margin-top: 40px;
`;

export interface ITableHeaderProps {
  label?: string;
  accessor?: string;
  className?: string;
  Cell?: (row: any) => void;
}
interface ITableProps {
  header: ITableHeaderProps[];
  data: any[];
  loading?: boolean;
}
const Table: FunctionComponent<ITableProps> = ({
  header,
  data = [],
  loading = false,
}) => {
  const tbody = (
    <TBody>
      {data.map((row, yindex) => {
        return (
          <tr key={yindex}>
            {header.map((col: ITableHeaderProps, xindex) => {
              const { accessor, Cell, className } = col;
              return (
                <td key={`${yindex}-${xindex}`} className={className}>
                  {Cell ? Cell(row) : accessor ? row[accessor] : null}
                </td>
              );
            })}
          </tr>
        );
      })}
    </TBody>
  );

  return (
    <Wrapper>
      <TableWrapper striped>
        <THead>
          <tr>
            {header.map((item, index) => {
              return <td key={index}>{item.label}</td>;
            })}
          </tr>
        </THead>

        {data.length !== 0 && !loading && tbody}
      </TableWrapper>
      {data.length === 0 && !loading && <TableInfo>No Data</TableInfo>}
      {loading && <TableInfo>Loading...</TableInfo>}
    </Wrapper>
  );
};

export default Table;
