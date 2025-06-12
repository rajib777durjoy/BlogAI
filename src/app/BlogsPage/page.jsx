
'use client'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useAuth } from '@clerk/nextjs';
import axiosPublic from '../AxiosPublic/page';
import useAxios from '../useAxios/page';
import Swal from 'sweetalert2';
import { RiAiGenerate2 } from "react-icons/ri";
import { RiGeminiFill } from "react-icons/ri";
import { useState } from 'react';






const Image_API_KEY = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_ImgBB_API_KEY}`
const BlogsPage = () => {
    const user = useAuth();
    // console.log("user:", user?.userId)
    const router = useRouter();
    const Axiosinstance = useAxios();
    const [AI_Text, setAI_Text] = useState('');
    const [Text, SetText] = useState('');
    const [TextTitle, setTextTitle] = useState('');
    const [Description, setDescription] = useState('')
    const [GeminiImg, setGeminiImg] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        // console.log('onsubmit for form hook')
        const formData = new FormData();
        formData.append('image', data?.Image[0])
        console.log('formData:', formData)
        const res = await axios.post(Image_API_KEY, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log('image response', res.data.data.display_url)

        if (res?.data?.data?.display_url) {
            const information = {
                title: data?.title,
                description: data?.description,
                image: res.data?.data?.display_url,
                userId: user?.userId,
                like: 0,
                comment: 0,
            }
            const response = await Axiosinstance.post(`/blogPost/${user?.userId}`, information);
            // console.log('response:', response)
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

        //    Gemini Generate Images post
        if (!res?.data?.data?.display_url) {
            const information = {
                title: data?.title,
                description: data?.description,
                image: GeminiImg,
                userId: user?.userId,
                like: 0,
                comment: 0,
            }
            const response = await Axiosinstance.post(`/blogPost/${user?.userId}`, information);
            // console.log('response:', response)
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

    }
    const handlesubmitText = async (e) => {
        e.preventDefault();
        setAI_Text('')
        console.log('handlesubmitText call:')
        const text = e.target.GeminiText.value;
        const res = await Axiosinstance.get(`/Gemini/textGenarate?text=${text}`, {})
        // console.log('gemini response:', res.data.result)
        if (res?.data?.result) {
            setAI_Text(res.data.result)
            document.getElementById('my_modal_5').close()
        }

    }
    const handleImageGenerateFun = async (e) => {
        e.preventDefault()
        const data = e.target.ImagePrompt.value;
        const Image = await Axiosinstance.get(`/Gemini/ImageGenerate?imgText=${data}`, { responseType: 'blob' })
        // console.log('image_Data:',Image.data);
        const imageUrl = URL.createObjectURL(Image.data);
        console.log('imageurl:', imageUrl);
        setGeminiImg(imageUrl)
    }
    return (
        <>
            <div className='w-[100%]'>
                {/*-------------------- First  form Start------------------------- */}
                <form onSubmit={handleSubmit(onSubmit)} className="bg-base-300 p-10 rounded-xl shadow-md w-[70%] mx-auto mt-4">
                    <div className="flex flex-col-reverse gap-3 min-h-[300px]">
                        <textarea
                            className="flex-1 resize-none border-2 focus:outline-none p-2 rounded-md bg-base-300 "
                            placeholder="What's on your mind?"
                            rows={10}
                            defaultValue={AI_Text}
                            {...register("description", {
                                onChange: (e) => {
                                    setDescription(e.target.value);
                                    console.log("description:", e.target.value);
                                }
                            })}
                        ></textarea>
                        <div className='flex w-[100%] items-center gap-4'>
                            <input
                                defaultValue={Text}
                                {...register("title", {
                                    onChange: (e) => {
                                        setTextTitle(e.target.value)
                                        console.log('title:', e.target.value)
                                    }
                                })}
                                className='w-[95%] h-[40px] px-2 ' type='text' placeholder='Enter the title' /><button onClick={() => document.getElementById('my_modal_5').showModal()} type='button' className='btn rounded-full'>AI<RiGeminiFill className='text-2xl' /></button>
                        </div>

                    </div>
                    <div className="flex justify-between mt-2">
                        <input {...register("Image")} type="file" className="file-input" />
                        <button onClick={() => document.getElementById('my_modal_1').showModal()} type='button' className='btn flex items-center'>Generate Image <RiAiGenerate2 className='text-lg' /></button>
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
                            disabled={(!TextTitle && !Description) || (!AI_Text && !TextTitle)}
                            className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"       >
                            Post
                        </button>
                    </div>
                </form>
                {/* --------------------First  form Close---------------------------------- */}
            </div>
            {/* -----------------------------------------------------------------------------------*/}

            {/* --------------------Second Modal Form Start------------------- */}
            <dialog id="my_modal_5" className="modal  modal-bottom sm:modal-middle">
                <form onSubmit={handlesubmitText} method="dialog" className='w-[600px] p-2  bg-base-300 rounded-lg'>
                    <textarea onChange={(e) => {
                        console.log('onchange methon', e.target.value)
                        SetText(e.target.value)
                    }} rows={5} className='w-[100%] border-0 p-2 ' name="GeminiText" placeholder='Ask Anythink' id=""></textarea>
                    <div className='flex justify-between items-center'>
                        <div onClick={() => {
                            document.getElementById('my_modal_5').close()
                        }} className="px-5 py-2 rounded-md bg-slate-300 font-bold">Close</div>
                        <button disabled={!Text} type='submit' className='btn bg-blue-500 text-white font-bold'>Generate</button>
                    </div>
                </form>
            </dialog>
            {/* --------------------Second Modal Form Close------------------- */}

            {/*-------------------- Third Modal from start----------------- */}
            <dialog id="my_modal_1" className="modal  modal-bottom sm:modal-middle">
                <form onSubmit={handleImageGenerateFun} method="dialog" className='w-[600px] p-2  bg-base-300 rounded-lg'>
                    <textarea onChange={(e) => {

                    }} rows={5} className='w-[100%] border-0 p-2 ' name="ImagePrompt" placeholder='Ask Anythink' id=""></textarea>
                    <div className='w-[100px] h-[100px]  my-5'>
                        <img src={GeminiImg} alt="image show" className='w-[90%] h-[90%] mt-1 mx-auto  rounded-md ' />
                    </div>

                    <div className='flex justify-between items-center'>
                        <div onClick={() => {
                            document.getElementById('my_modal_5').close()
                        }} className="px-5 py-2 rounded-md bg-slate-300 font-bold">Close</div>
                        <button  type='submit' className='btn bg-blue-500 text-white font-bold'>Generate</button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default BlogsPage;