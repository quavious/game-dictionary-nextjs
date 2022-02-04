import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Footer } from '../components/layout/footer';
import Layout from '../components/layout/Layout';
import GameListView from '../components/pages/List';
import { GameListProp } from '../types/game';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/games/1/popular`,
    );
    const data: GameListProp = await resp.json();
    return {
      props: {
        data,
        page: 1,
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
  useEffect(() => {
    setGames(props.data);
    setPage(props.page);
  }, [props]);

  return (
    <Layout url="/" image="" pageTitle="" keywords={`Game Dictionary`}>
      <GameListView games={games} />
      <Footer page={page} path="" hasNext={games.length === 20} />
    </Layout>
  );
};

export default Home;

// const [isLoading, setLoading] = useState(false);
// const bottom = useRef<HTMLDivElement>(null);
// const fetchGames = async (page: number) => {
//   setLoading(true);
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/games/${page}/popular`,
//   );
//   const nextGames: GameListProp = await resp.json();
//   setGames((games) => [...games, ...nextGames]);
//   setLoading(false);
// };
// const loadGames = () => {
//   setPage((prevPage) => prevPage + 1);
// };

// useEffect(() => {
//   console.log(page);
//   if (page == 1) {
//     return;
//   }
//   fetchGames(page);
// }, [page]);

// useEffect(() => {
//   if (isLoading) {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           if (process.env.NODE_ENV === 'development') {
//             console.log('Loading More');
//           }
//           loadGames();
//         }
//       },
//       { threshold: 1 },
//     );
//     if (bottom.current) {
//       observer.observe(bottom.current);
//     }
//   }
// }, [isLoading, bottom]);
