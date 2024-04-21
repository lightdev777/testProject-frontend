import Image from "next/image";

const ProductCard = ({
  collection,
  name,
  description,
  image_url,
}: {
  collection: string;
  name: string;
  description: string;
  image_url: string;
}) => (
  <div className="p-2 flex flex-col">
    <Image
      className={`aspect-[2/2] rounded-md object-cover`}
      src={image_url}
      alt={`${name} image`}
      width={1024}
      height={1024}
    />
    <div>
      {name && (
        <h3 className="mt-2 font-bold leading-10 text-rgba(0,48,73,128) text-xl">
          {name}
        </h3>
      )}
      {collection && (
        <div className="my-1 text-md leading-5 text-rgba(0,48,73,200)">
          {collection}
        </div>
      )}
      {description && (
        <div className="mt-1 text-sm leading-5 text-rgba(0,48,73,200) font-light italic">
          {description}
        </div>
      )}
    </div>
  </div>
);

export default ProductCard;
