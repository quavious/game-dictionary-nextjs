/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import gameStyle from '../../styles/Game.module.css';
import { GameItemProp } from '../../types/game';

const GameItemView = ({ game }: { game: GameItemProp }) => {
  const [videoIndex, setVideoIndex] = useState(0);
  return (
    <>
      <div className="flex flex-col h-full px-4 bg-white mt-2 py-2 mx-4">
        <h1 className="font-bold text-2xl md:text-3xl">{game.name}</h1>
        <div className="max-w-md w-full min-h-full h-auto mt-2 relative">
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/t_1080p/${game.cover}.jpg`}
            alt={`Game Cover ${game.id}`}
            className="flex justify-start h-72 w-auto object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row ">
          <div className="my-2">
            <h2 className="mt-2 fond-bold text-lg flex flex-wrap font-bold">
              Genres
            </h2>
            {game.genres &&
              game.genres.map((genre) => (
                <h4
                  key={genre.id}
                  className="inline-flex truncate mr-2 mt-1 bg-black text-white text-xs font-medium px-2 py-1 rounded"
                >
                  <Link href={`/genres/${genre.name}/1`}>{genre.name}</Link>
                </h4>
              ))}
          </div>
          <div className="my-2">
            <h2 className="mt-2 fond-bold text-lg flex flex-wrap font-bold">
              Themes
            </h2>
            {game.themes &&
              game.themes.map((theme) => (
                <h4
                  key={theme.id}
                  className="inline-flex truncate mr-2 mt-1 bg-pink-600 text-white text-xs font-medium px-2 py-1 rounded"
                >
                  <Link href={`/themes/${theme.name}/1`}>{theme.name}</Link>
                </h4>
              ))}
          </div>
        </div>
        <h2 className="mt-2 font-bold text-xl">Summary</h2>
        <h3 className="mt-2">{game.summary}</h3>
        {game.storyline && (
          <i className="font-medium bg-slate-600 text-white px-2 py-1 mt-2">
            {game.storyline}
          </i>
        )}
        <h2 className="mt-4 mb-2 font-bold text-xl">Artworks</h2>
        <div
          className={`flex mt-2 overflow-x-auto ${gameStyle['game-assets']}`}
        >
          {game.artworks.map((art, i) => (
            <img
              key={art}
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${art}.jpg`}
              alt={`Logo ${i + 1}`}
              className="w-auto h-80 py-2 px-1 bg-slate-500 object-cover shadow-md"
            />
          ))}
        </div>
        <h2 className="mt-4 mb-2 font-bold text-xl">Videos</h2>
        <div
          className={`flex mt-2 overflow-x-auto ${gameStyle['game-assets']}`}
        >
          {game.videos &&
            game.videos.map((video) => (
              <div key={video.video_id} className="flex flex-col">
                <div className="mb-1 inline-flex">
                  <h3 className="text-sm font-normal py-1 px-2 rounded-md bg-red-600 text-white">
                    {video.name}
                  </h3>
                </div>
                <div
                  className="py-2 px-1 bg-slate-500"
                  style={{ width: 16 * 32, height: 9 * 32 }}
                >
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.video_id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
        </div>
        <div className="mt-4 mb-2">
          <h2 className="font-bold">Websites</h2>
          <div className="flex flex-wrap">
            {game.websites.map((website) => (
              <div key={website.category} className="mr-2">
                <a
                  href={website.url}
                  target={'_blank'}
                  rel="noreferrer"
                  className="text-slate-500"
                >
                  {website.category}
                </a>
              </div>
            ))}
          </div>
        </div>
        <h4 className="text-sm mt-4 ml-auto font-bold">Platforms Supported</h4>
        <div className="flex mt-2 ml-auto">
          {game.platforms.map((platform) => (
            <img
              key={platform.name}
              className="w-8 h-auto ml-2"
              src={`https://images.igdb.com/igdb/image/upload/t_thumb/${platform.logo}.jpg`}
              alt={`Logo ${platform.name}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GameItemView;
