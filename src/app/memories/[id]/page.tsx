'use client'


import { Modal } from "@/components/Modal";
import { api } from "@/lib/api"
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";




interface Memorie {
    content: string;
    coverUrl: string;
}

export default async function Details({ params }: any) {
    const router = useRouter()


    const { id } = params

    const token = Cookies.get('token')

    const response = await api.get(`/memories/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const memorie: Memorie = response.data

    async function  deleteMemorie  (){
        const response = await api.delete(`/memories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

       if(response.status === 200){
        router.push("/")
       }
    }


    return (
        <div>
            <div className="mt-5 px-1">
                <Image 
              className="w-full aspect-video object-cover rounded-lg"
              src={memorie.coverUrl} 
              width={592} 
              height={280} 
              alt="" />

              <p className="text-lg leading-relaxed text-gray-100 mt-4">
                {memorie.content}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-end gap-5 pr-5">
                <button onClick={deleteMemorie} className="bg-red-600 rounded text-gray-100 px-5 py-2 leading-none font-alt hover:bg-red-500">
                    Excluir
                </button>

                <Modal/>
            </div>

            

           



        </div>
    )
}