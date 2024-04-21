import Image from "next/image";
import { notFound } from "next/navigation";

import HandleCart from "@/app/components/HandleCart";
import { getProductById } from "@/api/products";

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <Image
          className="aspect-[2/2] rounded-md object-cover"
          src={product.image_url}
          alt={`${product.name} image`}
          width={1024}
          height={1024}
        />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h1 className="text-3xl font-bold leading-10 text-rgba(0,48,73,128)">
          {product.name}
        </h1>
        <div className="my-1 text-md leading-5 text-rgba(0,48,73,200)">
          {product.collection}
        </div>
        <div className="mt-1 text-sm leading-5 text-rgba(0,48,73,200) font-light italic">
          {product.description}
        </div>
        <div className="flex justify-end">
          <HandleCart id={id} product={product} />
        </div>
      </div>
    </div>
  );
}
