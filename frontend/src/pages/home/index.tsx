/* eslint-disable react-hooks/exhaustive-deps */

import {
  Button,
  Chip,
  ScrollShadow,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BiKey } from "react-icons/bi";
import { toast } from "react-toastify";
import PlayIcon from "../../assets/icons/play";
import ResetIcon from "../../assets/icons/reset";
import History from "../../components/history";
import ModalComponent from "../../components/modal";
import TableComponent from "../../components/table";
import * as S from "./styles";

interface ConfigType {
  tables: string[];
  columns: string[];
}

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [textData, setTextData] = useState("");
  const [tableData, setTableData] = useState([]);

  const [config, setConfig] = useState<ConfigType>({ tables: [], columns: [] });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getHistory() {
    axios
      .get("http://localhost:3001/history")
      .then((response) => {
        setHistory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getConfig() {
    axios
      .get("http://localhost:3001/querys/config")
      .then((response) => {
        const data: ConfigType = response.data;
        data.tables = data.tables.map((table) => table + " ");
        data.columns = data.columns.map((column) => column + " ");
        data.columns = ["* ", ...data.columns];
        setConfig(data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    getHistory();
    getConfig();
  }, []);

  const [sql, setSql] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const autoCompleteSQL = [
    [
      "SELECT ",
      "INSERT ",
      "CREATE ",
      "ALTER ",
      "DROP ",
      "TRUNCATE ",
      "DELETE ",
      "UPDATE ",
      "GRANT ",
      "REVOKE ",
      "BACKUP ",
      "RESTORE ",
    ],
    config.columns,
    ["FROM ", "INTO ", "TABLE ", "DATABASE ", "INDEX ", "VIEW ", "TRIGGER "],
    config.tables,
    ["WHERE ", "SET ", "VALUES ", "ADD ", "MODIFY ", "CHANGE ", "RENAME "],
    [
      ...config.columns,
      "AND ",
      "OR ",
      "NOT ",
      "IN ",
      "LIKE ",
      "BETWEEN ",
      "IS NULL ",
      "IS NOT NULL ",
    ],
    ["ORDER BY ", "GROUP BY ", "HAVING ", "LIMIT ", "OFFSET "],
    ["ASC ", "DESC "],
  ];

  const [autoCompleteSQLFiltered, setAutoCompleteSQLFiltered] = useState<
    string[]
  >([]);

  function execute() {
    setTableData([]);
    setTextData("");
    axios
      .post(
        "http://localhost:3001/querys/execute",
        { query: sql },
        { headers: { Authorization: localStorage.getItem("rootPassword") } }
      )
      .then((response) => {
        if (response.data.type == "TABLE") {
          setTableData(response.data.data);
        }
        if (response.data.type == "TEXT") {
          setTextData(response.data.data.toString());
        }
        getHistory();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error:", error);
      });
  }

  function reset() {
    setSql("");
  }

  useEffect(() => {
    const lastWord = sql.split(" ").pop();

    const filtered = autoCompleteSQL[sql.split(" ").length - 1]?.filter(
      (item) => item.toLowerCase().startsWith(lastWord!.toLowerCase())
    );

    setAutoCompleteSQLFiltered(filtered);
  }, [sql]);

  function handleAutoComplete(item: string) {
    const sqlArgs = sql.split(" ");
    sqlArgs.pop();

    inputRef.current?.focus();

    if (sql.split(" ").length <= 1) {
      setSql(`${item}`);
      return;
    }

    setSql(`${sqlArgs.join(" ")} ${item}`);
  }

  return (
    <S.Container>
      <div className="content">
        <Textarea
          label="Query SQL"
          labelPlacement="outside"
          placeholder="Digite sua query aqui..."
          minRows={5}
          ref={inputRef}
          value={sql}
          onValueChange={setSql}
        />
        <ScrollShadow
          orientation="horizontal"
          style={{
            display: "flex",
            flexWrap: "nowrap",
            maxWidth: "100%",
            paddingBottom: "10px",
          }}
        >
          {autoCompleteSQLFiltered?.map((item, index) => (
            <Chip
              as={Button}
              key={index}
              onPress={() => handleAutoComplete(item)}
              className="chip"
            >
              {item}
            </Chip>
          ))}
        </ScrollShadow>

        <div className="buttons">
          <Button variant="flat" color="primary" isIconOnly onPress={onOpen}>
            <BiKey size={22} />
          </Button>
          <Button variant="flat" color="danger" onPress={reset}>
            <ResetIcon />
            Reset
          </Button>
          <Button variant="flat" color="success" onPress={execute}>
            <PlayIcon />
            Run
          </Button>
        </div>
        {textData && (
          <Chip variant="flat" color="success">
            {Number(textData) != 1
              ? `${textData} linhas foram afetadas!`
              : "1 linha foi afetada!"}
          </Chip>
        )}
        <TableComponent data={tableData} />

        <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
      <History loading={isLoading} data={history} />
    </S.Container>
  );
}
