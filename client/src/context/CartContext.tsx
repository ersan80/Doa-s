import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    hydrated: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, qty: number) => void;
    getTotalCount: () => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = (userId: string | null) =>
    userId ? `cart:${userId}` : "cart:guest";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { email } = useAuth();
    const storageKey = useMemo(() => STORAGE_KEY(email ?? null), [email]);

    const [items, setItems] = useState<CartItem[]>([]);
    const [hydrated, setHydrated] = useState(false);

    // ✅ localStorage'dan sepeti yükle (kullanıcı değiştiğinde de)
    useEffect(() => {
        const raw = localStorage.getItem(storageKey);
        setItems(raw ? JSON.parse(raw) : []);
        setHydrated(true);
    }, [storageKey]);

    // ✅ değişiklikleri storage'a kaydet
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(storageKey, JSON.stringify(items));
    }, [items, storageKey, hydrated]);

    const addToCart = (item: CartItem) => {
        setItems((prev) => {
            const found = prev.find((i) => i.id === item.id);
            if (found) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) =>
        setItems((prev) => prev.filter((i) => i.id !== id));

    const updateQuantity = (id: number, qty: number) =>
        setItems((prev) =>
            prev
                .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
                .filter((i) => i.quantity > 0)
        );

    const getTotalCount = () =>
        items.reduce((sum, i) => sum + i.quantity, 0);

    const clearCart = () => setItems([]); // sadece RAM'i temizler, storage'daki kayıt durur

    return (
        <CartContext.Provider
            value={{
                items,
                hydrated,
                addToCart,
                removeFromCart,
                updateQuantity,
                getTotalCount,
                clearCart,
            }}
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
