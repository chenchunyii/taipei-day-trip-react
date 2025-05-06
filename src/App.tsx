import { useState } from "react";
import "./App.css";
import Navigator from "./components/Navigator";
import Promotion from "./components/Promotion";
import Welcome from "./components/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Attraction from "./components/Attraction";

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigator />
              <Welcome onCategorySelect={setSelectedCategory} />
              <Promotion selectedCategory={selectedCategory} />
            </>
          }
        />
        <Route path="/attraction/:id" element={<Attraction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
