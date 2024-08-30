"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";

import PanelCodeHighlight from "@/components/compose/PanelCodeHighlight";
import Image from "@/components/core/Image";

const ComponentsCarouselVertical = () => {
  const items = ["carousel1.jpeg", "carousel2.jpeg", "carousel3.jpeg"];
  return (
    <PanelCodeHighlight
      title="Wheel Control"
      className="lg:col-span-2"
      codeHighlight={`import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Mousewheel } from 'swiper';

import Image from "@/components/core/Image";

<Swiper
  direction={"vertical"}
  slidesPerView={1}
  spaceBetween={0}
  mousewheel={true}
  pagination={{
    clickable: true,
  }}
  modules={[Mousewheel, Pagination]}
  className="mx-auto mb-5 max-w-6xl aspect-video"
>
  {items.map((item, i) => {
    return (
      <SwiperSlide key={i}>
        <Image
          src={\`/assets/images/template/\${item}\`}
          className="w-full"
          alt="itemImage"
        />
        <div className="absolute left-1/2 top-1/2 z-[999] w-full -translate-x-1/2 text-center text-white">
          <div className="text-base font-medium sm:text-xl">
            Lorem Ipsum is simply dummy text of the printing.
          </div>
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>
`}
    >
      <Swiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        className="mx-auto mb-5 max-w-6xl aspect-video"
      >
        {items.map((item, i) => {
          return (
            <SwiperSlide key={i}>
              <Image
                src={`/assets/images/template/${item}`}
                className="w-full"
                alt="itemImage"
              />
              <div className="absolute left-1/2 top-1/2 z-[999] w-full -translate-x-1/2 text-center text-white">
                <div className="text-base font-medium sm:text-xl">
                  Lorem Ipsum is simply dummy text of the printing.
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </PanelCodeHighlight>
  );
};

export default ComponentsCarouselVertical;
