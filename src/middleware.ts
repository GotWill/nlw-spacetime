import { NextRequest, NextResponse } from "next/server";

const signInUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`


export default function middLeware(request: NextRequest){
//  const token = request.cookies.get('token')?.value


//  if(!token){
//     return NextResponse.redirect(signInUrl, {
//         headers: {
//             'set-Cookie': `redirecTo=${request.url}; path=/; HttpOnly max-age=20`
//         }
//     })
//  }

//  return NextResponse.next()
}

// export const cofig = {
//     matcher: '/memories/:path*'
// }