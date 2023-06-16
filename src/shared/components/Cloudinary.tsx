import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { crop, thumbnail } from "@cloudinary/url-gen/actions/resize";

const cloudName = "dwuz66zpb";
const Clod = (img: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const image = cld.image(img);

  image.resize(thumbnail().width(150).height(250));

  return <AdvancedImage cldImg={image} />;
};

export default Clod;
