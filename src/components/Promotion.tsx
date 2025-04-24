import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Attraction } from "../interfaces/attraction";
import { Server } from "./Global";
import Footer from "./Footer";

const Promotion = () => {
  const [attractions, setAttraction] = useState<Attraction[]>([]);
  const nextPageRef = useRef<number>(1);
  const isLoadingRef = useRef<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const footerRef = useRef<HTMLDivElement>(null);

  const fetchAttractions = async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;

    try {
      const response = await axios.get<Attraction[]>(
        `${Server}/attractions?page=${nextPageRef.current}`
      );

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setAttraction((prev) => [...prev, ...response.data]);
        nextPageRef.current += 1;
      }
    } catch (error) {
      console.error("Error fetching attractions:", error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    fetchAttractions();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
        fetchAttractions();
      }
    }, options);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [hasMore]);

  return (
    <>
      <div className="promotion">
        {attractions.map((attraction) => (
          <div
            className="attraction_container display_flex"
            key={`attraction_id:${attraction.id}`}
          >
            <div className="attraction_container_img_bg">
              <img
                className="attraction_container_img"
                src={attraction.images ? attraction.images[0] : ""}
                alt={attraction.name}
              />
              <div className="attraction_container_name_bg display_flex">
                <div className="attraction_container_name_opacity"></div>
                <p className="attraction_container_name">{attraction.name}</p>
              </div>
            </div>
            <div className="attraction_container_text display_flex">
              <p className="attraction_container_mrt">{attraction.mrt}</p>
              <p className="attraction_container_catgory">
                {attraction.category}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div ref={footerRef}></div>
      <Footer />
    </>
  );
};

export default Promotion;
