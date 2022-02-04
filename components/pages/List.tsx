import { GameListProp } from '../../types/game';
import GameList from '../layout/GameList';

const GameListView = ({ games }: { games: GameListProp }) => {
  return (
    <>
      <div className="flex flex-col px-4">
        {games && games.map((game) => <GameList key={game.id} game={game} />)}
      </div>
    </>
  );
};

export default GameListView;
