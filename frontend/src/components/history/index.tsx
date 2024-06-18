import { CardBody, CardHeader, Divider, Spinner } from '@nextui-org/react';
import { useEffect } from 'react';
import * as S from './styles';

interface HistoryProps {
  loading: boolean;
  data: {
    id: number;
    query: string;
    result: string;
    resultType: 'TEXT' | 'TABLE';
    isCritical: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}

export default function History({ loading, data }: HistoryProps) {
  function getFormattedDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <S.Container>
      <CardHeader>
        <h1>Histórico</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        {!loading ? (
          data?.map((item) => (
            <>
              <div className='item' key={item.id}>
                <h2>{item.query}</h2>
                <p>Executado em {getFormattedDate(item.createdAt)}</p>
              </div>
              <Divider />
            </>
          ))
        ) : (
          <Spinner />
        )}
      </CardBody>
    </S.Container>
  );
}
