import { useState } from 'react'
import { usePacienteStore } from '../store/store'
import DialogModal from './DialogModal'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ListadoPacientes = () => {
    const pacientes = usePacienteStore(state => state.pacientes)
    const eliminarPaciente = usePacienteStore(state => state.eliminarPaciente)
    const restaurarPaciente = usePacienteStore(state => state.restaurarPaciente)
    const establecerPacienteActivo = usePacienteStore(state => state.establecerPacienteActivo)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [patientIdToDelete, setPatientIdToDelete] = useState<string | null>(null)

    const handleDeleteClick = (id: string) => {
        setPatientIdToDelete(id)
        setIsModalOpen(true)
    }

    const confirmDelete = () => {
        if (patientIdToDelete) {
            const patientToRestore = pacientes.find(p => p.id === patientIdToDelete)
            eliminarPaciente(patientIdToDelete)
            
            if (patientToRestore) {
                toast(
                    ({ closeToast }) => (
                        <div className="flex items-center justify-between pl-1 pr-0">
                            <span className="font-medium text-gray-700">Registro eliminado</span>
                            <button 
                                onClick={() => {
                                    restaurarPaciente(patientToRestore)
                                    closeToast?.()
                                }}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 px-4 rounded-md text-sm transition-colors ml-4 shadow-sm"
                            >
                                Deshacer
                            </button>
                        </div>
                    ), 
                    {
                        position: "bottom-right",
                        autoClose: 7000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    }
                )
            }
        }
        setIsModalOpen(false)
        setPatientIdToDelete(null)
    }

    const cancelDelete = () => {
        setIsModalOpen(false)
        setPatientIdToDelete(null)
    }

    const patientToDeleteName = pacientes.find(p => p.id === patientIdToDelete)?.name

    return (
        <div className="md:w-1/2 lg:w-3/5 h-screen overflow-y-scroll">
            <h2 className="font-black text-3xl text-center">Lista de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>
            
            {pacientes.map(paciente => (
                <div key={paciente.id} className="m-3 bg-white shadow-md px-5 py-10 rounded-xl">
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        ID: {''}
                        <span className="font-normal normal-case">{paciente.id}</span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        Nombre: {''}
                        <span className="font-normal normal-case">{paciente.name}</span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        Dueño: {''}
                        <span className="font-normal normal-case">{paciente.caretaker}</span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        Email: {''}
                        <span className="font-normal normal-case">{paciente.email}</span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        Fecha Alta: {''}
                        <span className="font-normal normal-case">{paciente.date}</span>
                    </p>
                    <p className="font-bold mb-3 text-gray-700 uppercase">
                        Síntomas: {''}
                        <span className="font-normal normal-case">{paciente.symptoms}</span>
                    </p>
                    <div className="flex justify-between mt-5 gap-3">
                        <button
                            type="button"
                            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg transition-colors"
                            onClick={() => establecerPacienteActivo(paciente)}
                        >
                            Editar
                        </button>

                        <button
                            type="button"
                            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg transition-colors"
                            onClick={() => handleDeleteClick(paciente.id)}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <DialogModal
                isOpen={isModalOpen}
                onClose={cancelDelete}
                onConfirm={confirmDelete}
                title="Eliminar Paciente"
                message={`¿Estás seguro de que deseas eliminar el registro de ${patientToDeleteName || 'este paciente'}? Esta acción no se puede deshacer.`}
            />

            <ToastContainer />
        </div>
    )
}

export default ListadoPacientes
