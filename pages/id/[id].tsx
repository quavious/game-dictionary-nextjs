import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import GameItemView from '../../components/pages/Item';
import { GameItemProp } from '../../types/game';
import { migrate } from '../../utils/redirect';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const _id = context.params?.id;
  if (typeof _id !== 'string') {
    return migrate(301);
  }
  const id = parseInt(_id);
  if (!id) {
    return migrate(301);
  }

  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/id/${id}`);
  const data: GameItemProp[] = await resp.json();
  if (!data || data.length < 1) {
    return migrate(301);
  }

  return {
    props: {
      data: data[0],
    },
  };
};

const GamePage = (props: any) => {
  const [item, setItem] = useState<GameItemProp>(props.data);
  useEffect(() => {
    setItem(props.data);
  }, [props]);

  return (
    <Layout
      url={`/id/${item.id}`}
      image={item.cover}
      pageTitle={item.name}
      keywords={`${item.name},${item.genres
        .map((e) => e.name)
        .join(',')},${item.themes.map((e) => e.name).join(',')}`}
    >
      <GameItemView game={item} />
    </Layout>
  );
};

export default GamePage;
