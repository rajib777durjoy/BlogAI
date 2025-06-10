'use client';
import React from 'react';

const Addblog = () => {
    return (
        <div>
            <div className="bg-base-300 p-4 rounded-xl shadow-md max-w-xl mx-auto mt-4">
                <div className="flex items-start gap-3">
                    <img
                        src="/user-avatar.png"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <textarea
                        className="flex-1 resize-none border-none focus:outline-none p-2 rounded-md bg-base-300 "
                        placeholder="What's on your mind?"
                    ></textarea>
                </div>
                <div className="flex justify-end mt-2">
                    <button
                        className="bg-blue-500 text-white px-4 py-1 rounded disabled:opacity-50"       >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Addblog;