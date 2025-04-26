import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Attraction } from "../interfaces/attraction";
import { Server } from "./Global";
import Footer from "./Footer";

interface PromotionProps {
  selectedCategory: string;
}

const Promotion = ({ selectedCategory }: PromotionProps) => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const nextPageRef = useRef<number>(1);
  const isLoadingRef = useRef<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadFirstPage = async () => {
      isLoadingRef.current = true;
      try {
        nextPageRef.current = 1;
        setHasMore(true);
        setAttractions([]);
        const response = await axios.get<Attraction[]>(
          `${Server}/attractions`,
          {
            params: {
              page: nextPageRef.current,
              keyword: selectedCategory,
            },
          }
        );
        setAttractions(response.data);
        nextPageRef.current += 1;
      } catch (error) {
        console.error("Error fetching first page:", error);
      } finally {
        isLoadingRef.current = false;
      }
    };

    if (selectedCategory) {
      loadFirstPage();
    }
  }, [selectedCategory]);

  const fetchMoreAttractions = async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;

    try {
      const response = await axios.get<Attraction[]>(`${Server}/attractions`, {
        params: {
          page: nextPageRef.current,
          keyword: selectedCategory,
        },
      });

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setAttractions((prev) => [...prev, ...response.data]);
        nextPageRef.current += 1;
      }
    } catch (error) {
      console.error("Error fetching more attractions:", error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
        fetchMoreAttractions();
      }
    }, options);

    const currentFooter = footerRef.current;
    if (currentFooter) {
      observer.observe(currentFooter);
    }

    return () => {
      if (currentFooter) {
        observer.unobserve(currentFooter);
      }
    };
  }, [hasMore, selectedCategory]);

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
