import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePacienteStore } from '../store/store'
import type { DraftPatient } from '../types'


const Formulario = () => { 
  const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)


    const pacienteActivo = usePacienteStore((state) => state.pacienteActivo)
    const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
    const limpiarPacienteActivo = usePacienteStore((state) => state.limpiarPacienteActivo)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<DraftPatient>()

  const registrarPaciente = (data: DraftPatient) => {
    if (pacienteActivo) {
      actualizarPaciente(data)
    } else {
      agregarPaciente(data)
    }
    limpiarPacienteActivo()
    reset()
  }

  useEffect(() => {
    if (pacienteActivo) {
      reset({
        name: pacienteActivo.name,
        caretaker: pacienteActivo.caretaker,
        email: pacienteActivo.email,
        date: pacienteActivo.date,
        symptoms: pacienteActivo.symptoms,
      })
      return
    }

    reset()
  }, [pacienteActivo, reset])

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
            onSubmit={handleSubmit(registrarPaciente)}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente 
                  </label>
                  <input  
                      id="name"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Paciente" 
                      {...register('name', { required: 'El nombre del paciente es obligatorio' })}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name?.message?.toString()}</p>}
              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    {...register('caretaker', { required: 'El nombre del propietario es obligatorio' })}
                />
                {errors.caretaker && <p className="text-red-500 text-sm mt-1">{errors.caretaker?.message?.toString()}</p>}
              </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-sm uppercase font-bold">
                  Email 
              </label>
              <input  
                  id="email"
                  className="w-full p-3  border border-gray-100"  
                  type="email" 
                  placeholder="Email de Registro" 
                  {...register('email', { 
                    required: 'El email es obligatorio',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email no válido'
                    }
                  })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email?.message?.toString()}</p>}
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3  border border-gray-100"  
                    type="date"
                    {...register('date', { required: 'La fecha es obligatoria' })} 
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date?.message?.toString()}</p>}
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    {...register('symptoms', { required: 'Los síntomas son obligatorios' })}
                ></textarea>
                {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms?.message?.toString()}</p>}
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={'Guardar Paciente'}
            />
        </form> 
    </div>
  )

}

export default Formulario