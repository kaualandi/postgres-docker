import {
  Button,
  Chip,
  getKeyValue,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import * as S from "./styles";

export default function TableComponent({
  data,
  execute,
  query,
}: {
  data: { id: string; query: string }[];
  execute: (sql: string) => void;
  query: string;
}) {
  const [columns, setColumns] = useState<{ key: string; label: string }[]>([]);

  const [rows, setRows] = useState(data.map((item) => item));

  const [selectedKeys, setSelectedKeys] = useState(new Set([]));

  useEffect(() => {
    if (data[0]) {
      setColumns([
        ...Object.keys(data[0]).map((key) => ({
          key,
          label: key.toUpperCase(),
        })),
        { key: "actions", label: "ACTIONS" },
      ]);
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function remove(id: string) {
    setRows((rest) => rest.filter((row) => row.id !== id));
    const table = query.split("FROM")[1].trim();
    execute(`DELETE FROM ${table} WHERE id = ${id}`);
  }

  function removeAll() {
    if (selectedKeys.size == undefined) return setRows([]);
    selectedKeys.forEach((key) => remove(key));
    setSelectedKeys(new Set([]));
  }

  return (
    <S.Container>
      <div className="header">
        <h2>Resultados</h2>

        {selectedKeys.size != 0 && rows.length > 0 && (
          <Button
            variant="flat"
            color="danger"
            size="sm"
            style={{ marginLeft: "20px" }}
            onPress={removeAll}
          >
            Excluir
            {` (${
              selectedKeys.size == undefined ? rows.length : selectedKeys.size
            })`}
          </Button>
        )}
      </div>
      {data.length == 0 && (
        <Chip style={{ marginLeft: "10px" }} size="sm">
          Nenhum resultado encontrado.
        </Chip>
      )}
      {data.length > 0 && columns.length > 0 && rows.length > 0 && (
        <S.Tabela
          aria-label={"Table"}
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <TableHeader columns={columns}>
            {(column) =>
              column.key != "actions" ? (
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
                  columnKey != "actions" ? (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  ) : (
                    <TableCell>
                      <Button
                        size="sm"
                        color="danger"
                        variant="flat"
                        onPress={() => remove(item.id)}
                      >
                        <BiTrash size={18} color="#f54180" />
                      </Button>
                    </TableCell>
                  )
                }
              </TableRow>
            )}
          </TableBody>
        </S.Tabela>
      )}
    </S.Container>
  );
}
