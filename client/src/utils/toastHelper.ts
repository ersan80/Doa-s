// src/utils/toastHelper.ts
import { toast } from 'react-toastify';

export const showSuccess = (msg: string) =>
    toast.success(msg, { autoClose: 3000 });

export const showError = (msg: string) =>
    toast.error(msg, { autoClose: 3000 });
