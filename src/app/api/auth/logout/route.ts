import { NextResponse } from "next/server";
export async function GET(request:NextResponse){


   const redirectUrl = new URL ('/', request.url)
  
   return NextResponse.redirect(redirectUrl, {
    headers: {
        'set-Cookie': `token=; path=/; max-age=0`
    }
   })


   

}