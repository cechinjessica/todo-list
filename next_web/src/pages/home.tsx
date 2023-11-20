import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/Card'
import { api } from '@/lib/api'
import { Inter } from 'next/font/google'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/Checkbox'
import { TrashIcon, PlusIcon } from '@radix-ui/react-icons'
import { Toaster } from '@/components/toast/Toaster'
import { toast } from '@/components/toast/Use-Toast'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { push } = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            push('/')
        } else {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
        }
    }, [])

    function handleDelete(id: number) {
        api.delete(`tasks/${id}`)
            .then(() => {
                refetch();
            })
            .catch((error) => {
                toast({
                    title: "Não foi possível deletar a tarefa",
                    description: " revalide os dados",
                    duration: 5 * 1000
                })
                console.log(error.response.data.message);
            });

    }

    function handleCreate() {
        api.post('tasks', { title, description, status: 'unchecked' })
            .then(() => {
                refetch();
            })
            .catch((error) => {
                toast({
                    title: "Erro ao criar uma tarefa",
                    description: " revalide os dados",
                    duration: 5 * 1000
                })
                console.log(error.response.data.message);
            })
            .finally(() => {
                setTitle('');
                setDescription('');
            });

    }

    function handleToggleCheck(task: any, status: boolean) {
        api.post('tasks/' + task?.id + '/update', { ...task, status: status ? 'unchecked' : 'checked' })
            .then(() => {
                refetch();
            })
            .catch((error) => {
                toast({
                    title: "Erro ao criar uma tarefa",
                    description: " revalide os dados",
                    duration: 5 * 1000
                })
                console.log(error.response.data.message);
            });

    }

    function handleLogout(e: FormEvent) {
        e.preventDefault();

        api.post('auth/logout', {})
            .then(res => {
                api.defaults.headers.common.Authorization = undefined
            })
            .catch((error) => {
                if (error.response.status != 401) {//já nao tem token
                    toast({
                        title: "Erro ao criar uma tarefa",
                        description: " revalide os dados",
                        duration: 5 * 1000
                    })
                }
                console.log(error.response.data.message)
            })
            .finally(() => {
                localStorage.removeItem("token")
                localStorage.removeItem("name")
                push('/')
            });
    }


    const { data: tasks, isLoading, error, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => api.get('tasks').then((res) => res.data)
    })

    // const name = localStorage.getItem("name");

    return (
        <main className={`min-h-screen ${inter.className}`}>
            <Toaster />
            <header className="px-4 py-3 z-10 w-full shadow-lg rounded-lg">
                <nav className="flex justify-between items-center">
                    <a href="/" className="text-3xl">
                        Olá {typeof window !== 'undefined' ? localStorage.getItem("name") : 'loading'}
                    </a>

                    <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
                        <a onClick={handleLogout}>Sair</a>

                    </div>

                </nav>
            </header >

            <div className='flex flex-col gap-3 p-32 items-center'>
                <Card className='pb-0 p-6 w-3/5'>
                    <div className='flex bg-gray-50 rounded-md p-2'>
                        <div className='mt-7 m-2'>
                            <Checkbox disabled />
                        </div>
                        <div className='flex-col w-full'>
                            <Input placeholder='Título' onChange={(e) => setTitle(e.target.value)} value={title} />
                            <Input placeholder='Descrição' onChange={(e) => setDescription(e.target.value)} value={description} />
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <Button className='bg-green-400' onClick={handleCreate} variant='outline'>
                            <PlusIcon className='text-gray-100' />
                        </Button>
                    </div>
                </Card>

                {tasks?.map((task: any) => (
                    <Card className='pb-0 p-6 w-3/5' key={task?.id}>
                        <div className='flex bg-gray-50 rounded-md p-2'>
                            <div className='mt-7 m-2'>
                                <Checkbox checked={task.status === 'checked'} onClick={() => handleToggleCheck(task, task?.status === 'checked')} />
                            </div>
                            <div className='flex-col w-full'>
                                <Input value={task?.title} />
                                <Input value={task?.description} />
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <Button className='bg-red-500 ' onClick={() => handleDelete(task?.id)} variant='outline'>
                                <TrashIcon className='text-gray-100' />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </main >
    )
}