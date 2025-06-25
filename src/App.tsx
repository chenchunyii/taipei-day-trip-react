import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../style/css/Register.css";
import "../style/css/Thankyou.css";
import "./App.css";
import AttractionPage from "./components/AttractionPage";
import BookingPage from "./components/BookingPage";
import Navigator from "./components/Navigator";
import Promotion from "./components/Promotion";
import ThankYouPage from "./components/ThankYouPage";
import Welcome from "./components/Welcome";

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
        <Route path="/attraction/:id" element={<AttractionPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/thanks" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
