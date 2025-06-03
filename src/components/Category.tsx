import React, { useEffect, useRef } from "react";

interface CategoryProps {
  categories: string[];
  show: boolean;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
  onClickOutside: () => void;
}

const Category = ({
  categories,
  show,
  onClick,
  onClickOutside,
}: CategoryProps) => {
  const categoryRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClickOutside]);

  return (
    <ul
      ref={categoryRef}
      className="category"
      style={{ display: show ? "grid" : "none" }}
    >
      {categories.map((category) => (
        <li className="category_li" key={category} onClick={onClick}>
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Category;
