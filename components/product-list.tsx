"use client";

import {getMoreProducts} from "@/app/(tabs)/products/actions";
import {InitialProducts} from "@/app/(tabs)/products/page";
import {useState} from "react";
import ListProduct from "./list-product";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({initialProducts}: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {!isLastPage && (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="active:sclae-95 mx-auto w-fit rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold hover:opacity-90">
          {isLoading ? "로딩 중" : "Load more"}
        </button>
      )}
    </div>
  );
}