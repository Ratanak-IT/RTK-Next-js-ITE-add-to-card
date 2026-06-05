"use client"
import { decrement, increment, resetValue } from "@/lib/features/countSlice/countSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "recharts/types/state/store";


export default function CartComponent(){

    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
        <button onClick={() => dispatch(increment(1))}>
        +1
      </button>

      <button onClick={() => dispatch(decrement(1))}>
        -1
      </button>

      <button onClick={() => dispatch(resetValue(0))}>
        Reset
      </button>
        
        </>
    )
}