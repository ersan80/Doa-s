// src/utils/toastHelper.ts
import { toast } from 'react-toastify';

export const showSuccess = (msg: string) =>
    toast.success(msg, { autoClose: 4000 });

export const showError = (msg: string) =>
    toast.error(msg, { autoClose: 3000 });



export const showInfo = (msg: string) =>
    toast.info(msg, { autoClose: 3000 });