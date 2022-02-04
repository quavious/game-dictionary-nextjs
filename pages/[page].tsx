import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Footer } from '../components/layout/footer';
import Layout from '../components/layout/Layout';
import GameListView from '../components/pages/List';
import { GameListProp } from '../types/game';
import { migrate } from '../utils/redirect';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const _page = context.params?.page;
  if (typeof _page !== 'string') {
    return migrate(301);
  }
  const page = parseInt(_page);
  if (page < 2) {
    return migrate(302);
  }
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/${page}/popular`,
    );
    const data: GameListProp = await resp.json();
    return {
      props: {
        data,
        page,
      },
    };
  } catch (err) {
    return migrate(302);
  }
};

const Page = (props: any) => {
  const [games, setGames] = useState<GameListProp>([]);
  const [page, setPage] = useState<number>(props.page);

  useEffect(() => {
    setGames(props.data);
    setPage(props.page);
  }, [props]);

  return (
    <Layout
      url={`/${page}`}
      image=""
      pageTitle={`Page ${page}`}
      keywords={`Game Dictionary`}
    >
      <GameListView games={games} />
      <Footer page={page} path="" hasNext={games.length === 20} />
    </Layout>
  );
};

export default Page;
