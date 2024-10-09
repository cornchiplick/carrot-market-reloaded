"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  HomeIcon as OutlineHomeIcon,
  UserIcon as OutlineUserIcon,
  NewspaperIcon as SolidNewsPaperIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
} from "@heroicons/react/24/outline";
import {
  NewspaperIcon as OutlineNewsPaperIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  ChatBubbleOvalLeftEllipsisIcon as SoildChatIcon,
  HomeIcon as SolidHomeIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 mx-auto grid w-full max-w-screen-md grid-cols-5 border-t border-neutral-600 bg-neutral-800 px-5 py-3 *:text-white">
      <Link href="/products" className="flex flex-col items-center gap-px">
        {pathname === "/products" ? (
          <SolidHomeIcon className="h-7 w-7" />
        ) : (
          <OutlineHomeIcon className="h-7 w-7" />
        )}
        <span>홈</span>
      </Link>
      <Link href="/life" className="flex flex-col items-center gap-px">
        {pathname === "/life" ? (
          <SolidNewsPaperIcon className="h-7 w-7" />
        ) : (
          <OutlineNewsPaperIcon className="h-7 w-7" />
        )}
        <span>동네생활</span>
      </Link>
      <Link href="/chat" className="flex flex-col items-center gap-px">
        {pathname === "/chat" ? (
          <SoildChatIcon className="h-7 w-7" />
        ) : (
          <OutlineChatIcon className="h-7 w-7" />
        )}
        <span>채팅</span>
      </Link>
      <Link href="/live" className="flex flex-col items-center gap-px">
        {pathname === "/live" ? (
          <SolidVideoCameraIcon className="h-7 w-7" />
        ) : (
          <OutlineVideoCameraIcon className="h-7 w-7" />
        )}
        <span>쇼핑</span>
      </Link>
      <Link href="/profile" className="flex flex-col items-center gap-px">
        {pathname === "/profile" ? (
          <SolidUserIcon className="h-7 w-7" />
        ) : (
          <OutlineUserIcon className="h-7 w-7" />
        )}
        <span>나의 당근</span>
      </Link>
    </div>
  );
}
