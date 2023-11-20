import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { api } from '@/lib/api'
import { Inter } from 'next/font/google'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Toaster } from '@/components/toast/Toaster'
import { toast } from '@/components/toast/Use-Toast'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const { push } = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        await api.post('auth/register', { name, email, password })
            .then(res => { //se der certo entao
                api.post('auth/login', { email, password })
                    .then(res => {
                        api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("name", res.data.name)
                        push('/home')
                    })
                    .catch((error) => {
                        console.log(error.response.data.message)
                        push('/home')
                    })

            })
            .catch((error) => {
                toast({
                    title: "Erro ao registrar usuário",
                    description: "Revalide os dados",
                    duration: 5 * 1000
                })
                console.log(error.response.data.message)
            })

    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common.Authorization = `Bearer ${token}`
            push('/home');
        }
    }, [])


    return (
        <main className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}>
            <Toaster />

            <Card className='w-96 p-10 justify-center'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                    <h2>Crie o seu login</h2>
                    <Input placeholder='Nome' onChange={(e) => setName(e.target.value)} value={name} />
                    <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
                    <Input placeholder='Senha' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                    <Button type='submit'>Criar</Button>
                </form>
                <div className='flex gap-2 mt-2'><p>Já tem cadastro?</p>
                    <Link href='/'><p>Realize o login!</p></Link>
                </div>

            </Card>

        </main>
    )
}