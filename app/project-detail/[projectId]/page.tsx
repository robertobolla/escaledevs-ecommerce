"use client";
import Breadcrums from "@/app/_components/Breadcrums";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useEffect, useState } from "react";
import ProjectBanner from "./_components/ProjectBanner";
import ProjectInfo from "./_components/ProjectInfo";
import ProductList from "@/app/_components/ProductList";
import { usePathname } from "next/navigation";

function ProjectDetail({ params }) {
  const path = usePathname();
  const [productDetail, setProductDetail] = useState();
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    console.log("Project Path", path);
    params?.projectId && getProductById_();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.projectId]);
  const getProductById_ = () => {
    GlobalApi.getProductById(params.projectId).then((resp) => {
      setProductDetail(resp.data.data);
      getProductListByCategory(resp.data.data);
    });
  };
  const getProductListByCategory = (product) => {
    GlobalApi.getProductByCategory(product?.attributes?.category).then(
      (resp) => {
        console.log(resp);
        setProductList(resp.data.data);
      }
    );
  };
  return (
    <div className="p-5 py-20 px-10 md:px-28">
      <Breadcrums path={path} />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-10 gap-5 sm:gap-5 justify-evenly">
        <ProjectBanner product={productDetail} />
        <ProjectInfo product={productDetail} />
        {productList && (
          <div className="mt-20">
            <h2 className="font-medium text-[20px] mb-4">Similar Projects</h2>
            <ProductList productList={productList} />
          </div>
        )}
      </div>
    </div>
  );
}
//<ProductList productList={}/>

export default ProjectDetail;
