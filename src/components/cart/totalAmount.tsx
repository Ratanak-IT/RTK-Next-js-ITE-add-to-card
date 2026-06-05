
import { RootState } from "@/app/cart/page";
import { useDispatch, useSelector } from "react-redux";
export default function TotalAmountComponent(){
     const {totalAmount } = useSelector((state: RootState) => state.cart);
    return (
        <>
            <p className="text-lg text-red-300 p-5 rounded-2xl">Total Amount : ${totalAmount.toFixed(2)}</p>
        </>
    )
}