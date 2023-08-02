import { useTranslation } from '../../../i18n/client'

const Search = ({ style, lng }) => {
  const { t } = useTranslation(lng, 'search')
  return (
    <form>
      <input
        type="text"
        className={style}
        placeholder={t("Search-for-campaigns")}
      />
    </form>
  );
};

export default Search;
