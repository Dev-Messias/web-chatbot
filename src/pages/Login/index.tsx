import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Key } from "lucide-react"
import imgBot from '@/assets/chatbot.png'
import { useContext, useState } from "react"
import { AuthContext } from "@/context/AuthContext"
import { toast } from 'react-toastify';

function Login() {
  const [apiKey, setApiKey] = useState('')

  const { signIn } = useContext(AuthContext);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (apiKey === '') {
      toast.info("(*) Campos com asterisco são obrigatórios.")
      return;
    }
    await signIn({ apiKey })
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-50" >
      <div className="w-full px-2 max-w-4xl 2xl:max-w-2xl mx-auto" >

        <Card>
          <CardHeader className="flex flex-col items-center justify-center" >
            <div className="flex flex-row items-center " >
              <img src={imgBot} alt="logo-bot" className="w-11" />
              <h1 className="text-xl font-bold" >Web-Chatbot</h1>
            </div>
            <CardDescription>Acesse a plataforma e veja todos os seus contatos. </CardDescription>
          </CardHeader>


          <CardContent>
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-7 mb-8" >
              <div className="flex flex-col gap-2" >
                <Label className="flex flex-row items-center gap-1" >
                  <Key className="w-4" />
                  Chave API<span className="text-red-600 font-bold" >*</span>
                </Label>
                <Input
                  placeholder="Digite uma chave API válida"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>

              <Button className="text-base" type="submit">Acessar</Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

export default Login;