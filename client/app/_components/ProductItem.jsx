import Image from "next/image";
import { ChevronRightSquare } from "lucide-react";
import Link from "next/link";

const ProductItem = ({ product }) => {
  return (
    <Link href={"/project-detail/" + product.id}>
      <div className="hover:border p-4 rounded-lg border-primary-light/40">
        <Image
          src={product?.attributes?.image?.data?.[0]?.attributes?.url}
          width={400}
          height={350}
          alt="image"
          className="rounded-t-lg h-[200px] object-cover"
        />
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-b-lg">
          <div className="p-3">
            <h2 className="text-[19px] font-medium">
              {product.attributes.title}
            </h2>
            {product?.attributes?.category && (
              <h2 className="text-[15px] text-gray-500 flex gap-2 font-medium line-clamp-1">
                <ChevronRightSquare className="w-4 h-4" />
                {product?.attributes?.category}
              </h2>
            )}
          </div>
          <h2 className="font-bold">${product.attributes?.price}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
