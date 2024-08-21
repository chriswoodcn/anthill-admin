import PanelCodeHighlight from '@/components/compose/PanelCodeHighlight';
import React from "react";
import Image from "@/components/core/Image";

const ElementsAvatarShapes = () => {
  return (
    <PanelCodeHighlight
      title="Shapes"
      codeHighlight={`<Image className="w-20 h-20 rounded-md overflow-hidden object-cover" src="/assets/images/template/profile-12.jpeg" alt="img" />

<Image className="w-16 h-16 rounded-full overflow-hidden object-cover" src="/assets/images/template/profile-12.jpeg" alt="img" />

<Image className="w-14 h-14 rounded-md overflow-hidden object-cover" src="/assets/images/template/profile-12.jpeg" alt="img" />

<Image className="w-10 h-10 overflow-hidden object-cover" src="/assets/images/template/profile-12.jpeg" alt="img" />`}
    >
      <div className="mb-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Image
            className="h-20 w-20 overflow-hidden rounded-md object-cover"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <Image
            className="h-16 w-16 overflow-hidden rounded-full object-cover"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <Image
            className="h-14 w-14 overflow-hidden rounded-md object-cover"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
          <Image
            className="h-10 w-10 overflow-hidden object-cover"
            src="/assets/images/template/profile-12.jpeg"
            alt="img"
          />
        </div>
      </div>
    </PanelCodeHighlight>
  );
};

export default ElementsAvatarShapes;
