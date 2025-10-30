import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
    getTotalCount: () => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        // ✅ sayfa ilk yüklendiğinde localStorage'dan oku
        const stored = localStorage.getItem("cartItems");
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ her değişiklikte localStorage'a yaz
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }, [items]);

    const addToCart = (item: CartItem) => {
        setItems(prev => {
            const found = prev.find(i => i.id === item.id);
            if (found) {
                return prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) =>
        setItems(prev => prev.filter(i => i.id !== id));

    const updateQuantity = (id: number, qty: number) =>
        setItems(prev =>
            prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        );

    const getTotalCount = () =>
        items.reduce((sum, i) => sum + i.quantity, 0);

    const clearCart = () => setItems([]);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, getTotalCount, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
};
