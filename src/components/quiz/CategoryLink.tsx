import { Link } from "react-router-dom";
import { Category } from "../../interfaces/Category";

export default function CategoryLink({
  categoryColor,
  categoryId,
  categoryName,
}: Category) {
  return (
    <Link
      to={`/quiz/`}
      state={{ categoryId: categoryId, categoryName: categoryName }}
      style={{ backgroundColor: categoryColor }}
      key={categoryId}
    >
      {categoryName}
    </Link>
  );
}
