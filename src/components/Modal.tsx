
'use client'

import * as Dialog from '@radix-ui/react-dialog';
import './modal.css'
import { Camera } from 'lucide-react';
import { MediaPicker } from './MediaPicker';
import { FormEvent } from 'react';
import { api } from '@/lib/api';
import Cookie from "js-cookie"
import { useRouter } from 'next/router';


interface MemorieId {
    params: string;
}

export function Modal() {

    const router = useRouter()


    async function editMemorie(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget);

        const fileToUpload = formData.get('coverUrl')

        let coverUrl = ''

        if (fileToUpload) {
            const uploadFormData = new FormData()

            uploadFormData.set('file', fileToUpload)

            const uploadResponse = await api.post('upload', uploadFormData)

            coverUrl = uploadResponse.data.fileUrl
        }

        const token = Cookie.get('token')

        await api.put(`/memories/a3440a84-197b-4f92-832b-4461e674a932`, {
            coverUrl,
            content: formData.get('content'),
            isPublic: formData.get('isPublic'),

        }, {
            headers: {
                Authorization: `Bearer ${token}`,

            }
        })
        // .then(function (response) {
        //    if(response.status == 200){
        //       router.push("/")
        //    }else {
        //      throw new Error("Algo deu errado, tente mais tarde")
        //    }
        // })

         
    }

    return (

        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button className="bg-green-500 rounded text-gray-50 px-5 py-2 leading-none font-alt hover:bg-green-400">Editar</button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <div className="flex">
                        <Dialog.Title className="DialogTitle">Editar lembrança</Dialog.Title>

                        <Dialog.Close asChild>
                            <button className="IconButton" aria-label="Close">
                                X
                            </button>
                        </Dialog.Close>
                    </div>


                    <form onSubmit={editMemorie}>
                        <div className="flex  items-center gap-4">
                            <label htmlFor="midia" className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                                <Camera className="w-4 h-4" /> Anexar mídia
                            </label>

                            <label htmlFor="isPublic" className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100">
                                <input type="checkbox" name="isPublic" id="isPublic" value="true" className="h-4 w-4 rounded border-green-900 bg-lime-400 text-purple-500" />
                                Tornar memoria publica
                            </label>
                        </div>

                        <MediaPicker />



                        <textarea
                            name="content"
                            spellCheck={false}
                            className="w-full mt-3 h-40 flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
                            placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
                        />

                        <button type="submit" className="self-end inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600">Editar</button>
                    </form>


                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )

}