/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Chip, ScrollShadow, Textarea } from '@nextui-org/react';
import { useEffect, useRef, useState } from 'react';
import PlayIcon from '../../assets/icons/play';
import ResetIcon from '../../assets/icons/reset';
import TableComponent from '../../components/table';
import * as S from './styles';

export default function Home() {
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
    ['* ', 'COUNT(', 'SUM(', 'AVG(', 'MIN(', 'MAX('],
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
        <Button variant='flat' color='danger' onPress={reset}>
          <ResetIcon />
          Reset
        </Button>
        <Button variant='flat' color='success'>
          <PlayIcon />
          Run
        </Button>
      </div>
      <TableComponent />
    </S.Container>
  );
}
