import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Questionsscreen.css"; 

const slides = [
  { id: 1, 
    text: "En Kısa Sürede  Soruları Cevapla" },
  { id: 2, text: "İstersen Pasla istersen Harf Aç" },
  { id: 3, text: "En Yüksek Skora Sahip Ol Lider Ol" },
];

export default function Info() {
  return (
    <div className="card">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="box" >{slide.text}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
