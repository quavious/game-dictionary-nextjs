import FooterView from './View';

const FooterPresenter = ({
  page,
  path,
  hasNext,
}: {
  page: number;
  path: string;
  hasNext: boolean;
}) => {
  return (
    <FooterView
      page={page}
      path={{ prev: `${path}/${page - 1}`, next: `${path}/${page + 1}` }}
      hasNext={hasNext}
    />
  );
};

export default FooterPresenter;
