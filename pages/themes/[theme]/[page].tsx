import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Footer } from '../../../components/layout/footer';
import Layout from '../../../components/layout/Layout';
import GameListView from '../../../components/pages/List';
import { GameListProp } from '../../../types/game';
import { migrate } from '../../../utils/redirect';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const theme = context.params?.theme;
    const _page = context.params?.page;
    if (typeof theme !== 'string' || typeof _page !== 'string') {
      return migrate(301);
    }
    // const theme = parseInt(_theme);
    const page = parseInt(_page);
    if (!theme || !page) {
      return migrate(301);
    }
    if (page < 1) {
      return migrate(302);
    }
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/theme/${theme}/${page}/popular`,
    );
    const data: GameListProp = await resp.json();
    return {
      props: {
        data,
        page,
        theme,
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
  const [theme, setTheme] = useState<string>(props.theme);
  useEffect(() => {
    setGames(props.data);
    setPage(props.page);
    setTheme(props.theme);
  }, [props]);
  return (
    <Layout
      url={`/genres/${theme}/${page}`}
      image=""
      pageTitle={`Theme ${theme} - Page ${page}`}
      keywords={`${theme},Game Dictionary`}
    >
      <GameListView games={games} />
      <Footer
        page={page}
        path={`/themes/${theme}`}
        hasNext={games.length === 20}
      />
    </Layout>
  );
};

export default Home;
