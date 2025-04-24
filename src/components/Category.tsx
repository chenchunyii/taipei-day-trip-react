interface CategoryProps {
  categories: string[];
  show: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}

const Category = ({ categories, show, onClick }: CategoryProps) => {
  return (
    <ul className="category" style={{ display: show ? "grid" : "none" }}>
      {categories.map((category) => (
        <li className="category_li" key={category} onClick={onClick}>
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Category;
