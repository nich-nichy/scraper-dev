import { GetCredentialsForUser } from '@/actions/credentials/getCredentialsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LockKeyhole, ShieldIcon, ShieldOffIcon, User } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateCredentialDialogue from './_components/CreateCredentialDialogue'
import { formatDistance, formatDistanceToNow } from 'date-fns'
import DeleteCredentialDialog from './_components/DeleteCredentialDialogue'

// const CredentialsPage = () => {
//     return (
//         <div className='flex flex-1 flex-col h-full'>
//             <div className='flex justify-between'>
//                 <div className='flex flex-col'>
//                     <h1 className='text-3xl font-bold'>Credentials</h1>
//                     <p className='text-muted-foreground'>Manage your credentials</p>
//                 </div>
//                 <div>
//                     <CreateCredentialDialogue />
//                 </div>
//             </div>
//             <div className='h-full py-6 space-y-8'>
//                 <Alert className='flex items-center space-x-3'>
//                     <ShieldIcon size={25} className="stroke-blue-500 rounded-full bg-accent" />
//                     <div>
//                         <AlertTitle className="font-primary">Encryption</AlertTitle>
//                         <AlertDescription>
//                             All information is encrypted, ensuring your data is secure.
//                         </AlertDescription>
//                     </div>
//                 </Alert>
//                 <Suspense fallback={<Skeleton className='h-[300px] w-full' />}>
//                     <UserCredentials />
//                 </Suspense>
//             </div>
//         </div>
//     )
// }

const CredentialsPage = () => {
    return (
        <div className='flex flex-1 flex-col h-full mx-auto space-y-6'>
            <div className='flex flex-col sm:flex-row justify-between items-center py-6 border-b border-gray-200'>
                <div className='mb-4 sm:mb-0'>
                    <h1 className='text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white'>
                        Credentials
                    </h1>
                    <p className='text-sm text-gray-500 mt-2'>
                        Manage and secure your authentication credentials
                    </p>
                </div>
                <div className='w-full sm:w-auto'>
                    <CreateCredentialDialogue />
                </div>
            </div>

            <div className='space-y-6 '>
                <Alert className='bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg shadow-sm  dark:bg-[#1C1917]'>
                    <div className='flex items-center space-x-4'>
                        <div className='bg-blue-100 p-3 rounded-full'>
                            <ShieldIcon
                                size={25}
                                className="stroke-blue-600 stroke-2"
                            />
                        </div>
                        <div>
                            <AlertTitle className="text-lg font-semibold text-blue-900 dark:text-white">
                                Encryption
                            </AlertTitle>
                            <AlertDescription className='text-blue-700 text-sm dark:text-muted-foreground'>
                                All information is encrypted, ensuring your data remains completely secure.
                            </AlertDescription>
                        </div>
                    </div>
                </Alert>

                <Suspense fallback={
                    <div className='bg-gray-100 rounded-lg animate-pulse'>
                        <Skeleton className='h-[300px] w-full rounded-lg' />
                    </div>
                }>
                    <UserCredentials />
                </Suspense>
            </div>
        </div>
    )
}

export default CredentialsPage

async function UserCredentials() {
    const credentials = await GetCredentialsForUser();
    if (credentials.length === 0) {
        return (
            <Card className='w-full max-w-full mx-auto shadow-lg duration-300 border border-gray-100'>
                <div className='flex flex-col gap-6 items-center justify-center p-6'>
                    <div className='rounded-full bg-blue-50 w-24 h-24 flex items-center justify-center 
            shadow-md duration-300'>
                        <ShieldOffIcon
                            size={32}
                            className='stroke-blue-500 stroke-2'
                        />
                    </div>
                    <div className='flex flex-col gap-2 text-center'>
                        <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>No Credentials Created</h3>
                        <p className='text-sm text-gray-500 max-w-[250px] mx-auto'>
                            Click the button below to create your first credential
                        </p>
                    </div>
                    <div>
                        <CreateCredentialDialogue />
                    </div>

                </div>
            </Card>
        )
    }
    return (
        <div className='flex gap-2 flex-wrap'>
            {credentials.map((credential) => {
                const createdAt = formatDistanceToNow(credential.createdAt, { addSuffix: true });
                return (
                    <Card key={credential.id} className='w-full p-4 flex justify-between' >
                        <div className='flex gap-2 items-center'>
                            <div className='rounded-full bg-primary/10 w-8 h-8 flex items-center justify-center'>
                                <LockKeyhole size={20} className='stroke-primary' />
                            </div>
                            <div>
                                <p className='font-bold'>{credential.name}</p>
                                <p className='text-sm text-muted-foreground'>{createdAt}</p>
                            </div>
                        </div>
                        <DeleteCredentialDialog name={credential.name} />
                    </Card>
                )
            })}
        </div>
    )
}
