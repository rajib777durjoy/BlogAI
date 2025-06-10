'use client';
import Image from "next/image";
import BlogsPage from "./BlogsPage/page";
import Addblog from "./component/AddBlog/page";
import Allblog from "./component/AllBlog/page";


export default function Home() {
  return (
    <div className="w-[90%] mx-auto flex justify-between gap-10">
      <div className="w-[300px] border-2 min-h-[650px] sticky top-2 mt-5">
        sidebar
      </div>
      <Allblog></Allblog>
       {/* <BlogsPage></BlogsPage> */}
    </div>
  );
}
