import Image from "next/image";

const ProjectBanner = ({ product }) => {
  return (
    <div className="pt-2">
      {product ? (
        <Image
          src={product?.attributes?.image?.data?.[0]?.attributes?.url}
          width={700}
          height={400}
          alt="image"
          className="rounded-lg object-cover sm:float:right text-center"
        />
      ) : (
        <div className="h-[400px] w-[400px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};

export default ProjectBanner;
