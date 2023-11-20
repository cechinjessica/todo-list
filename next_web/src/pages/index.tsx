import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Card } from '@/components/Card'
import { api } from '@/lib/api'
import { Inter } from 'next/font/google'
import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/toast/Use-Toast'
import { Toaster } from '@/components/toast/Toaster'


const inter = Inter({ subsets: ['latin'] })

export default function Login() {
  const { push } = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await api.post('auth/login', { email, password })
      .then(res => {
        api.defaults.headers.common.Authorization = `Bearer ${res.data.token}`
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("name", res.data.name)
        push('/home')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast({
            title: "Erro ao logar usuário",
            description: error.response.data.message,
            duration: 5 * 1000
          })
        }
      })
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      push('/home')
    }
  }, [])


  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <Toaster />
      <Card className='w-96 p-10 justify-center'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
          <h2>Realize o seu login</h2>
          <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <Input placeholder='Senha' type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
          <Button type='submit'>Login</Button>
        </form>

        <div className='flex gap-2 mt-2'>
          <p>Ainda não tem cadastro?</p>
          <Link href='/register'><p>Registre-se!</p></Link>
        </div>

      </Card>
    </main>
  )
}
