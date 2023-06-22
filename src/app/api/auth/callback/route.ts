import { NextResponse } from "next/server";
import { api } from "@/lib/api";

export async function GET(request:NextResponse){
   const { searchParams } = new URL(request.url)
   const code = searchParams.get('code')

   const redirecTo = request.cookies.get('redirecTo')?.value

   const registerResponse = await api.post('/register',{
    code,
   })

   const {token} = registerResponse.data

   const redirectUrl = redirecTo ?? new URL ('/', request.url)
   const cookieExpireInSeconds = 60 * 60 * 24 * 30
  
   return NextResponse.redirect(redirectUrl, {
    headers: {
        'set-Cookie': `token=${token}; path=/; max-age=${cookieExpireInSeconds}`
    }
   })


   

}