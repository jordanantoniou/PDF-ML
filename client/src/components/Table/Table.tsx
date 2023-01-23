import { ReactNode, ReactElement } from 'react';

type HeaderChild = ReactElement<HeaderProps, typeof Header>;
type BodyChild = ReactElement<RowProps, typeof Row>;

interface TableProps {
  children: [HeaderChild, BodyChild[]];
}

const Table = ({ children }: TableProps) => {
  const [headerRow, ...rest] = children;
  return (
    <div className=" overflow-hidden rounded-md  border border-base-3">
      <table className="table-auto items-start divide-base-3 text-left">
        {headerRow}
        <tbody className="divide-y divide-base-3">{rest}</tbody>
      </table>
    </div>
  );
};

const Cell = ({ children, ...rest }: { children: ReactNode }) => (
  <td className="px-4 py-3" {...rest}>
    {children}
  </td>
);

interface HeaderProps {
  titles: string[];
}

const Header = ({ titles = [] }: HeaderProps) => {
  return (
    <thead className="bg-base-4">
      <tr className="divide-x divide-base-3">
        {titles.map((title) => (
          <Cell key={title}>{title}</Cell>
        ))}
      </tr>
    </thead>
  );
};

export interface RowProps {
  values: string[];
  key: string;
}

const Row = ({ values = [] }: RowProps) => {
  return (
    <tr className="divide-x divide-base-3">
      {values.map((value) => (
        <Cell key={value}>{value}</Cell>
      ))}
    </tr>
  );
};

Table.Header = Header;
Table.Row = Row;

export { Table };
