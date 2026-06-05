"use client"
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";


export default function CartCountComponent(){
    const count = useSelector((state: RootState) => state.count.value);
    return (
        <>
            <p className="text-lg text-red-300 p-5 rounded-2xl">Count number : {count}</p>
        </>
    )
}