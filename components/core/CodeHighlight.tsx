import "highlight.js/styles/monokai.css";
import hightlight from "highlight.js";
import { PropsWithChildren, useRef } from "react";
import useEffectOnce from "@/lib/hooks/useEffectOnce";

const CodeHighlight = ({ children }: PropsWithChildren) => {
  const highlightElement = useRef<any>(null);

  useEffectOnce(() => {
    if (highlightElement?.current) {
      hightlight.highlightElement(
        highlightElement.current.querySelector("pre")
      );
    }
  }, []);

  return (
    <div ref={highlightElement} className="highlight-el relative">
      {children}
    </div>
  );
};

export default CodeHighlight;
