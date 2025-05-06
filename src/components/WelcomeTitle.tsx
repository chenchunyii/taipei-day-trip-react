import { FaSearch } from "react-icons/fa";
import Category from "./Category";
import axios from "axios";
import React, { useState } from "react";

interface WelcomeTitleProps {
  onCategorySelect: (category: string) => void;
}

const WelcomeTitle = ({ onCategorySelect }: WelcomeTitleProps) => {
  const [categories, setCategoies] = useState<string[]>([]);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const Server = import.meta.env.VITE_API_URL;

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Server}/attraction/categories`);
      const categories = response.data;
      const categoryNames = categories.map(
        (item: { category: string }) => item.category
      );
      setCategoies(categoryNames);
    } catch (error) {
      console.error("Error fetching categoies:", error);
    }
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const selected = event.currentTarget.textContent ?? "";
    setInputValue(selected);
    onCategorySelect(selected);
    setShowCategory(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue) {
      onCategorySelect(inputValue);
    }
  };

  return (
    <div className="welcome_title display_flex">
      <header className="welcome_heading">輕鬆享受台北一日悠閒</header>
      <p className="welcome_subtext">探索每個角落，體驗城市的深度旅遊行程</p>
      <form
        className="welcome_category_form display_flex"
        onSubmit={handleSubmit}
      >
        <input
          className="welcome_category_input"
          autoFocus
          type="text"
          placeholder="輸入景點名稱查詢"
          value={inputValue}
          onClick={() => {
            fetchCategories();
            setShowCategory(true);
          }}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="welcome_category_button display_flex" type="submit">
          <FaSearch />
        </button>
      </form>
      <Category
        categories={categories}
        show={showCategory}
        onClick={handleCategoryClick}
      />
    </div>
  );
};

export default WelcomeTitle;
