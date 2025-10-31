// src/model/UserTypes.ts
export interface Address {
    id: number;
    line1: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    apartment?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatarUrl?: string;        // "/uploads/...png" gibi (başında slash var)
    defaultAddress?: string;   // Metin; biz yine de kartlardan seçtirip burayı doldurtacağız
    addresses?: Address[];
}
