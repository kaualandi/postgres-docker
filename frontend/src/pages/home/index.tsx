/* eslint-disable react-hooks/exhaustive-deps */

import {
  Button,
  Chip,
  ScrollShadow,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { BiKey } from 'react-icons/bi';
import PlayIcon from '../../assets/icons/play';
import ResetIcon from '../../assets/icons/reset';
import History from '../../components/history';
import ModalComponent from '../../components/modal';
import TableComponent from '../../components/table';
import * as S from './styles';

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [tableData, setTableData] = useState([]);

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getHistory() {
    axios
      .get('http://localhost:3001/history')
      .then((response) => {
        setHistory(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  const [sql, setSql] = useState('');

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const autoCompleteSQL = [
    [
      'SELECT ',
      'INSERT ',
      'CREATE ',
      'ALTER ',
      'DROP ',
      'TRUNCATE ',
      'DELETE ',
      'UPDATE ',
      'GRANT ',
      'REVOKE ',
      'BACKUP ',
      'RESTORE ',
    ],
    ['* '],
    ['FROM ', 'INTO ', 'TABLE ', 'DATABASE ', 'INDEX ', 'VIEW ', 'TRIGGER '],
    ['WHERE ', 'SET ', 'VALUES ', 'ADD ', 'MODIFY ', 'CHANGE ', 'RENAME '],
    [
      'AND ',
      'OR ',
      'NOT ',
      'IN ',
      'LIKE ',
      'BETWEEN ',
      'IS NULL ',
      'IS NOT NULL ',
    ],
    ['ORDER BY ', 'GROUP BY ', 'HAVING ', 'LIMIT ', 'OFFSET '],
    ['ASC ', 'DESC '],
  ];

  const [autoCompleteSQLFiltered, setAutoCompleteSQLFiltered] = useState<
    string[]
  >([]);

  function execute() {
    axios
      .post(
        'http://localhost:3001/querys/execute',
        { query: sql },
        { headers: { Authorization: localStorage.getItem('rootPassword') } }
      )
      .then((response) => {
        if (response.data.type == 'TABLE') {
          setTableData(response.data.data);
        }
        getHistory();
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function reset() {
    setSql('');
  }

  useEffect(() => {
    const lastWord = sql.split(' ').pop();

    const filtered = autoCompleteSQL[sql.split(' ').length - 1]?.filter(
      (item) => item.toLowerCase().startsWith(lastWord!.toLowerCase())
    );

    setAutoCompleteSQLFiltered(filtered);
  }, [sql]);

  function handleAutoComplete(item: string) {
    const sqlArgs = sql.split(' ');
    sqlArgs.pop();

    inputRef.current?.focus();

    if (sql.split(' ').length <= 1) {
      setSql(`${item}`);
      return;
    }

    setSql(`${sqlArgs.join(' ')} ${item}`);
  }

  return (
    <S.Container>
      <div className='content'>
        <Textarea
          label='Query SQL'
          labelPlacement='outside'
          placeholder='Digite sua query aqui...'
          minRows={5}
          ref={inputRef}
          value={sql}
          onValueChange={setSql}
        />
        <ScrollShadow
          orientation='horizontal'
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            maxWidth: '100%',
            paddingBottom: '10px',
          }}
        >
          {autoCompleteSQLFiltered?.map((item, index) => (
            <Chip
              as={Button}
              key={index}
              onPress={() => handleAutoComplete(item)}
              className='chip'
            >
              {item}
            </Chip>
          ))}
        </ScrollShadow>

        <div className='buttons'>
          <Button variant='flat' color='primary' isIconOnly onPress={onOpen}>
            <BiKey size={22} />
          </Button>
          <Button variant='flat' color='danger' onPress={reset}>
            <ResetIcon />
            Reset
          </Button>
          <Button variant='flat' color='success' onPress={execute}>
            <PlayIcon />
            Run
          </Button>
        </div>
        <TableComponent data={tableData} />

        <ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
      <History loading={isLoading} data={history} />
    </S.Container>
  );
}
