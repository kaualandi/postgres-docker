import { CardHeader, Divider, Spinner } from '@nextui-org/react';
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

  return (
    <S.Container>
      <CardHeader>
        <h1>Histórico</h1>
      </CardHeader>
      <Divider />
      <S.Body>
        {!loading ? (
          data
            ?.map((item) => (
              <div key={item.id}>
                <S.Item>
                  <h2>{item.query}</h2>
                  <p>Executado em {getFormattedDate(item.createdAt)}</p>
                </S.Item>
                <Divider />
              </div>
            ))
            .reverse()
        ) : (
          <Spinner style={{ marginTop: '50px' }} />
        )}
      </S.Body>
    </S.Container>
  );
}
