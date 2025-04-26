import { useState } from "react";
import "./App.css";
import Navigator from "./components/Navigator";
import Promotion from "./components/Promotion";
import Welcome from "./components/Welcome";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <>
      <Navigator />
      <Welcome onCategorySelect={setSelectedCategory} />
      <Promotion selectedCategory={selectedCategory} />
    </>
  );
}

export default App;
