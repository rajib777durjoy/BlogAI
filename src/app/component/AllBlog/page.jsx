import { useRouter } from 'next/navigation';
import React from 'react';

const Allblog = () => {
    const router = useRouter()
    return (
     
            <div className='w-[100%] flex justify-between mt-5'>
                <div>
                    <input type="text" placeholder="Search" className="input input-bordered border-2  md:w-[800px]" />
                </div>
                <button className='btn text-white font-medium bg-blue-400' onClick={() => {
                    router.push('/BlogsPage')
                }}>Create Post</button>
            </div>

    );
};

export default Allblog;