import type { Patient } from "../types"
import PacienteDetalle from "./PacienteDetalle"
import { usePacienteStore } from '../store/store'


type PacienteProps = {
    paciente: Patient
}

const Paciente = ({ paciente }: PacienteProps) => {
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente)
    const establecerPacienteActivo = usePacienteStore((state) => state.establecerPacienteActivo)

    const handleClick = () => {
        eliminarPaciente(paciente.id)
    }

    const handleClickEditar = () => {
        establecerPacienteActivo(paciente)
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PacienteDetalle label="ID" data={paciente.id} />
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha Alta" data={paciente.date || ''} />
            <PacienteDetalle label="Síntomas" data={paciente.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClickEditar}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={handleClick}
                >Eliminar</button>
            </div>
        </div>
    )
}

export default Paciente
