import Head from 'next/head';
import Link from 'next/link';
import { LayoutProp } from '../../types/layout';
import { Search } from './search';

const Layout = ({ url, image, pageTitle, keywords, children }: LayoutProp) => {
  return (
    <>
      <Head>
        <title>{pageTitle && pageTitle + ' | '}Game Dictionary</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta
          name="description"
          content="Game Dictionary. People can search and find games that they have wanted. Popularity, Genres, Themes, Keywords are available."
        />
        {image && (
          <>
            <meta
              name="image"
              content={`${process.env.NEXT_PUBLIC_IMAGE_URL}/t_1080p/${image}.jpg`}
            />
            <meta
              name="og:image"
              content={`${process.env.NEXT_PUBLIC_IMAGE_URL}/t_1080p/${image}.jpg`}
            />
            <meta
              name="twitter:image"
              content={`${process.env.NEXT_PUBLIC_IMAGE_URL}/t_1080p/${image}.jpg`}
            />
          </>
        )}
        {url && (
          <>
            <meta name="url" content={url} />
            <meta name="og:url" content={url} />
            <meta name="twitter:url" content={url} />
          </>
        )}
        {url && (
          <>
            <meta name="keywords" content={keywords} />
            <meta name="og:keywords" content={keywords} />
            <meta name="twitter:keywords" content={keywords} />
          </>
        )}
      </Head>
      <div className="container mx-auto max-w-4xl pb-4">
        <div className="w-full flex justify-center items-center h-40">
          <h1 className="font-bold text-xl xs:text-2xl sm:text-4xl text-white">
            <Link href={'/'}>Game Dictonary</Link>
          </h1>
        </div>
        <Search />
        {children}
      </div>
    </>
  );
};

export default Layout;
