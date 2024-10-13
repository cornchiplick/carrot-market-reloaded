import {formatToTimeAgo, formatToWon} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({title, price, created_at, photo, id}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 overflow-hidden rounded-md">
        {/* ${photo}/avatar 의 형식으로 나타내야 하지만 내 CF 계정으로는 불가능하다. */}
        <Image fill src={`${photo}/public`} alt={title} className="object-cover" />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">{formatToTimeAgo(created_at.toString())}</span>
        <span className="text-lg font-semibold">{formatToWon(price)}원</span>
      </div>
    </Link>
  );
}
