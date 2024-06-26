import {
  Button,
  getKeyValue,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import * as S from './styles';

export default function TableComponent({
  data,
}: {
  data: { id: string; query: string }[];
}) {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'query', label: 'QUERY' },
    { key: 'actions', label: 'ACTIONS' },
  ];

  const [rows, setRows] = useState(
    data.map((item) => ({ id: item.id, query: item.query }))
  );

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  useEffect(() => {
    setRows(data.map((item) => ({ id: item.id, query: item.query })));
  }, [data]);

  function remove(id: string) {
    setRows((rest) => rest.filter((row) => row.id !== id));
  }

  function removeAll() {
    if (selectedKeys.size == undefined) return setRows([]);
    selectedKeys.forEach((key) => remove(key));
  }

  return (
    <S.Container>
      <div className='header'>
        <h2>Resultados</h2>

        {selectedKeys.size != 0 && rows.length > 0 && (
          <Button
            variant='flat'
            color='danger'
            size='sm'
            style={{ marginLeft: '20px' }}
            onPress={removeAll}
          >
            Excluir
            {` (${
              selectedKeys.size == undefined ? rows.length : selectedKeys.size
            })`}
          </Button>
        )}
      </div>
      <S.Tabela
        aria-label={'Table'}
        selectionMode='multiple'
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <TableHeader columns={columns}>
          {(column) =>
            column.key != 'actions' ? (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            ) : (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )
          }
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) =>
                columnKey != 'actions' ? (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                ) : (
                  <TableCell>
                    <Button
                      size='sm'
                      color='danger'
                      variant='flat'
                      onPress={() => remove(item.id)}
                    >
                      <BiTrash size={18} color='#f54180' />
                    </Button>
                  </TableCell>
                )
              }
            </TableRow>
          )}
        </TableBody>
      </S.Tabela>
    </S.Container>
  );
}
