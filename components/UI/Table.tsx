import React from 'react';

interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const Table = <T,>({ data, columns }: DataTableProps<T>) => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-800 text-white shadow-xs rounded-xl border border-default">
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm text-body bg-gray-600 border-b border-default-medium">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-3 font-medium">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="border-b border-default hover:bg-gray-600 transition duration-300">
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  {/* Якщо є render-функція, використовуємо її, інакше виводимо значення за ключем */}
                  {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
