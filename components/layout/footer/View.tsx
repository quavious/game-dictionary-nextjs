import Link from 'next/link';
import { Path } from '../../../types/path';

const FooterView = ({
  page,
  path,
  hasNext,
}: {
  page: number;
  path: Path;
  hasNext: boolean;
}) => {
  return (
    <div className="px-4 py-2 flex justify-start">
      {page > 1 && (
        <h5 className="bg-purple-600 text-white py-1 px-2 rounded font-semibold mr-2">
          <Link href={path.prev}>Previous</Link>
        </h5>
      )}
      <h5 className="py-1 px-2 bg-purple-600 text-white rounded font-bold mr-2">
        {page}
      </h5>
      {hasNext && (
        <h5 className="bg-purple-600 text-white py-1 px-2 rounded font-semibold">
          <Link href={path.next}>Next</Link>
        </h5>
      )}
    </div>
  );
};

export default FooterView;
