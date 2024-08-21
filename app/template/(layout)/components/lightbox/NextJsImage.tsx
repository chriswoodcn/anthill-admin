import Image from "@/components/core/Image";
import {
  isImageFitCover,
  isImageSlide,
  RenderSlideProps,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

export default function NextJsImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isImageSlide(slide)) {
    return null;
  }
  if (!slide.width) {
    slide.width = rect.width;
  }
  if (!slide.height) {
    slide.height = rect.height;
  }

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height!!) * slide.width!!)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width!!) * slide.height!!)
      )
    : rect.height;

  return (
    <div
      className="flex justify-center items-center"
      style={{ position: "relative", width, height }}
    >
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}
