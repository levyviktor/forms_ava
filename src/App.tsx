import { useState } from 'react';
import './styles/global.css';
/**
 * To-Do
 * 
 * [ ] Validacao / transformacao
 * [ ] Field Arrays
 * [ ] Upload de arquivos
 * [ ] Composition Pattern 
 * 
 */

import { useForm } from 'react-hook-form'
import { transformer, z } from 'zod'
import { zodResolver} from '@hookform/resolvers/zod'



const createUserFormSchema = z.object({
  nome: z.string()
    .nonempty('O nome e obrigatorio')
  
    .transform(name => {
      return name.trim().split(' ').map(word => {
       return word[0].toLocaleUpperCase().concat(word.substring(1))
     }).join(' ')
   }),
  email: z.string().nonempty('O e-email e obrigatorio')
    .email('Formato de e-mail invalido')
  .toLowerCase(),
  password: z.string()
  .min(6, 'A senha precisa de o minimo 6 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>


export function App() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors } }
    = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
    });
  

  function createUser(data: any) {
    setOutput(JSON.stringify(data, null, 2 ))

  }


  //Hig-order function
  //exe: .map .reduce .faig


  return (
    <main className="h-screen bg-zinc-950 flex text-zinc-300  items-center justify-center flex-col gap-10">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input
            type="email"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Nome</label>
          <input
            type="name"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register("nome")}
          />
          {errors.nome && <span>{errors.nome.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input
            type="password"
            className="border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>

      <pre>{output}</pre>
    </main>
  );
}


