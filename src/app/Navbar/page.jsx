
'use client'
import { SignedIn, UserButton } from '@clerk/nextjs';
import { useClerk } from '@clerk/clerk-react';
import React from 'react';
import {
    SignInButton,
    SignUpButton,
    SignedOut,
} from '@clerk/nextjs'


const Navber = () => {
    const { signOut, session } = useClerk()
    const handelSignout = async () => {
        await signOut(session.id)
    }
    return (
        <div className='w-[100%] bg-base-300  shadow-sm'>
            <div className="w-[90%] mx-auto navbar ">
                <div className="flex-1">
                    <a className="text-2xl font-bold">BlogAI</a>
                </div>
                <div className="flex gap-2">
                   
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className=" rounded-full">
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <SignedIn>
                                <button
                                    onClick={() => {
                                        handelSignout()
                                    }}
                                    className="btn btn-primary"
                                >
                                    Sign Out
                                </button>
                            </SignedIn>

                            <SignedOut>
                                <SignInButton />
                                <SignUpButton />
                            </SignedOut>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navber;