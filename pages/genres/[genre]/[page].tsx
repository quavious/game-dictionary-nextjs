import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Footer } from '../../../components/layout/footer';
import Layout from '../../../components/layout/Layout';
import GameListView from '../../../components/pages/List';
import { GameListProp } from '../../../types/game';
import { migrate } from '../../../utils/redirect';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const genre = context.params?.genre;
    const _page = context.params?.page;
    if (typeof genre !== 'string' || typeof _page !== 'string') {
      return migrate(301);
    }
    // const genre = parseInt(_genre);
    const page = parseInt(_page);
    if (!genre || !page) {
      return migrate(301);
    }
    if (page < 1) {
      return migrate(302);
    }
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/genre/${genre}/${page}/popular`,
    );
    const data: GameListProp = await resp.json();
    return {
      props: {
        data,
        page,
        genre,
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
  const [genre, setGenre] = useState<string>(props.genre);
  useEffect(() => {
    setGames(props.data);
    setPage(props.page);
    setGenre(props.genre);
  }, [props]);
  return (
    <Layout
      url={`/genres/${genre}/${page}`}
      image=""
      pageTitle={`Genre ${genre} - Page ${page}`}
      keywords={`${genre},Game Dictionary`}
    >
      <GameListView games={games} />
      <Footer
        page={page}
        path={`/genres/${genre}`}
        hasNext={games.length === 20}
      />
    </Layout>
  );
};

export default Home;
