import { ReactNode } from 'react';

const Table = ({ children }: ReactNode) => {
  const [headerRow, ...rest] = children;
  return (
    <div className=" overflow-hidden rounded-md  border border-base-3">
      <table className="table-auto items-start divide-base-3 text-left">
        {headerRow}
        <tbody className="divide-y divide-base-3">{...rest}</tbody>
      </table>
    </div>
  );
};

const Cell = ({ children, ...rest }) => (
  <td className="px-4 py-3" {...rest}>
    {children}
  </td>
);

const Header = ({ titles = [] }) => {
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

const Row = ({ values = [] }) => {
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
