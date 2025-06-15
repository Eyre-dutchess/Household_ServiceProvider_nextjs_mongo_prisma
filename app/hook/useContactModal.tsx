import {create} from "zustand";

interface ModalStore{
    open: boolean,
    onOpen: ()=> void,
    onClose: ()=> void
}

export const useContactModal = create<ModalStore>((set)=>({
    open: false,
    onOpen: ()=> set({open: true}),
    onClose: ()=> set({open: false})
}))