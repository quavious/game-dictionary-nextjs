/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import { GameListItemProp } from '../../types/game';

const GameList = ({ game }: { game: GameListItemProp }) => {
  return (
    <div className="flex justify-start grow bg-white mx-auto mt-2 mb-3 w-full p-2">
      <img
        className="mr-2 w-24 xs:w-32 sm:w-48 md:w-56 h-auto object-cover"
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/t_720p/${game.cover}.jpg`}
        alt={`Game Cover ${game.id}`}
      />
      <div className="flex flex-col pr-2 pb-2 max-w-sm xs:max-w-md sm:max-w-xl w-full">
        <h1 className="font-bold text-xl lg:text-2xl w-24 fold:w-36 xs:w-48 sm:w-80 md:w-full truncate">
          <Link href={`/id/${game.id}`}>{game.name}</Link>
        </h1>
        <div className="flex flex-col items-start mt-1">
          <h3 className="font-bold mr-2 py-1 px-2 mt-1 text-sm bg-green-500 text-white rounded">
            {Math.round(game.total_rating)}/100 Score
          </h3>
          <h3 className="font-bold py-1 px-2 mt-1 text-sm bg-red-600 text-white rounded">
            {game.total_rating_count} Likes
          </h3>
        </div>
        <div className="flex flex-wrap mt-auto w-28 fold:w-36 xs:w-52 sm:w-64 md:w-full">
          {game.genres &&
            game.genres.map((genre) => (
              <h4
                key={genre.id}
                className="truncate mr-2 mt-1 bg-black text-white text-sm font-bold px-2 py-1 rounded"
              >
                <Link href={`/genres/${genre.name}/1`}>{genre.name}</Link>
              </h4>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GameList;
