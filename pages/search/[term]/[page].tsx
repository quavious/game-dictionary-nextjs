import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Footer } from '../../../components/layout/footer';
import Layout from '../../../components/layout/Layout';
import GameListView from '../../../components/pages/List';
import { GameListProp } from '../../../types/game';
import { migrate } from '../../../utils/redirect';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const term = context.params?.term;
    const _page = context.params?.page;
    if (typeof term !== 'string' || typeof _page !== 'string') {
      return migrate(301);
    }
    const page = parseInt(_page);
    if (!page || page < 1) {
      return migrate(302);
    }
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/search/${term}/${page}`,
    );
    const data: GameListProp = await resp.json();
    return {
      props: {
        data,
        page,
        term,
      },
    };
  } catch (err) {
    return {
      props: {},
    };
  }
};

const Home = (props: any) => {
  const [games, setGames] = useState<GameListProp>(props.data);
  const [page, setPage] = useState<number>(props.page);
  const [term, setTerm] = useState<string>(props.term);
  useEffect(() => {
    setGames(props.data);
    setPage(props.page);
    setTerm(props.term);
  }, [props]);
  return (
    <Layout
      url={`/search/${term}/${page}`}
      image=""
      pageTitle={`Search ${term} - Page ${page}`}
      keywords={`${term},Game Dictionary`}
    >
      <GameListView games={games} />
      <Footer
        page={page}
        path={`/search/${term}`}
        hasNext={games.length === 20}
      />
    </Layout>
  );
};

export default Home;
