"use client"
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@/lib/store";
import { removeFromCart, addToCart } from "@/lib/features/cartSlice/cartSlice";
import Image from "next/image";
import TotalAmountComponent from "@/components/cart/totalAmount";
import { Trash2, ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type RootState = ReturnType<AppStore["getState"]>;

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5 text-center px-4">
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <ShoppingCart className="w-11 h-11 text-gray-400" strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Your cart is empty
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-xs mt-2">
            Looks like you havenot added anything yet.
          </p>
        </div>
        <Link
          href="/product"
          className="mt-1 inline-flex items-center gap-2 text-base font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/product"
          className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Your Cart
        </h1>
        <span className="ml-auto text-sm text-gray-400 dark:text-gray-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center gap-5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-800 dark:text-gray-100 text-base truncate">
                {item.name}
              </h2>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                ${item.price.toFixed(2)} each
              </p>
              <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-1 py-1">
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <span className="w-6 text-center text-sm font-semibold text-gray-800 dark:text-gray-100">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                        ...item,
                      quantity: 1,
                    })
                  )
                }
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Remove entirely */}
            <button
              onClick={() => {
                for (let i = 0; i < item.quantity; i++) {
                  dispatch(removeFromCart(item.id));
                }
              }}
              className="p-2.5 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-gray-100 dark:border-gray-800" />

      {/* Total */}
      <TotalAmountComponent />
    </div>
  );
}