import { Cloudinary } from "@cloudinary/url-gen";

const cloudName = "dwuz66zpb";
const Clod = (img: string) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const image = cld.image(img);

  return <img height="200" src={image.toURL()}></img>;
};

export default Clod;
