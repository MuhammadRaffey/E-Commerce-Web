import Image from 'next/image';
import React, { useState } from 'react';

interface CartItemProps {
    id: number;
    user_id: string;
    product_id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    category: string;
    quantity: number;
}

const CartItem = ({ id, user_id, product_id, title, description, image, price, quantity: initialQuantity, category }: CartItemProps) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    return (
        <li className="flex items-center gap-4">
            <Image src={image} alt={title} className="rounded object-cover" width={130} height={100} />
            <div>
                <h3 className="text-sm">{title}</h3>
                <p className="text-xs">{description}</p>
                <p className="text-xs">{category}</p>
                <dl className="mt-0.5 space-y-px text-[10px]">
                    <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">${price}</dd>
                    </div>
                    <div>
                        <dt className="inline">Quantity:</dt>
                        <dd className="inline">{quantity}</dd>
                    </div>
                </dl>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
                <form>
                    <label htmlFor={`Line${id}Qty`} className="sr-only"> Quantity </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                        id={`Line${id}Qty`}
                        className="h-8 w-12 rounded border border-primary p-0 text-center text-xs [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                </form>
                <button className="transition hover:text-red-600">
                    <span className="sr-only">Remove item</span>
                    Remove
                </button>
            </div>
        </li>
    );
};

export default CartItem;
