
'use client'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useAuth } from '@clerk/nextjs';
import axiosPublic from '../AxiosPublic/page';
import useAxios from '../useAxios/page';
import Swal from 'sweetalert2';






const Image_API_KEY = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_ImgBB_API_KEY}`
const BlogsPage = () => {
    const user = useAuth()
    console.log("user:", user?.userId)
    const router = useRouter()
    const Axiosinstance = useAxios()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {

        const ImageFile = { image: data?.Image[0] }

        //  if(!ImageFile){
        //     return ;
        //  }
        console.log('data', data?.Image[0])
        const res = await axios.post(Image_API_KEY, ImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log('image response', res.data.data.display_url)
        const information = {
            title: data?.title,
            description: data?.description,
            image: res.data?.data?.display_url,
            userId: user?.userId,
            like: 0,
            comment: 0,
        }
        console.log("information", information)
        const response = await Axiosinstance.post(`/blogPost/${user?.userId}`, information);
        console.log('response:', response)
        if (response.data.data.insertedId > 0) {

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <>
            <div className='w-[100%]'>
                <div className='w-[100%]  flex justify-between my-5'>
                    <div>
                        <input type="text" placeholder="Search" className="input input-bordered  md:w-[800px]" />
                    </div>
                    <button onClick={() => {
                        document.getElementById('my_modal_5').showModal()
                    }} className='btn bg-blue-500'>Create Post</button>
                </div>

                <div>
                    helojdfosfs
                </div>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-base-300 p-4 rounded-xl shadow-md w-[700px] mx-auto mt-4">
                        <div className="flex flex-col-reverse gap-3 min-h-[300px]">
                            <textarea
                                className="flex-1 resize-none border-2 focus:outline-none p-2 rounded-md bg-base-300 "
                                placeholder="What's on your mind?"
                                rows={10}
                                {...register("description")}
                            ></textarea>
                            <input {...register("title")} className='w-[100%] h-[50px] border-2 px-2' type='text' placeholder='Enter the title'></input>
                        </div>
                        <div className="flex justify-between mt-2">
                            <input {...register("Image")} type="file" className="file-input" />

                        </div>
                        <div className='flex justify-between py-4'>
                            <button
                                type='submit'
                                className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50" onClick={() => {
                                    document.getElementById('my_modal_5').close()
                                }}  >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"       >
                                Post
                            </button>
                        </div>
                    </form>
                </dialog>
            </div>

        </>


    );
};

export default BlogsPage;