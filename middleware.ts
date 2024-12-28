// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);


// export default clerkMiddleware(async (auth, req) => {
//     if (!isPublicRoute(req)) await auth.protect()
// })

// export const config = {
//     matcher: [
//         '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//         '/(api|trpc)(.*)',
//     ],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/',
    '/capture(.*)',
    '/payment/cancel(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    if (isPublicRoute(req)) return;

    await auth.protect();
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};
