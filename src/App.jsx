import { useState, useEffect } from 'react'
import { FcEmptyTrash } from "react-icons/fc";

import Swal from 'sweetalert2';
import firebaseConfigApp from './util/firebase-config'
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore'

const db = getFirestore(firebaseConfigApp)

const App = () => {
  const model = {
    employeeName: '',
    salary: '',
    joiningDate: ''
  }
  const [employees, setEmployees] = useState(model)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    const req = async () => {
      const snapshot = await getDocs(collection(db, "employees"))
      setIsEmpty(snapshot.empty)
      snapshot.forEach((doc) => {
        const documents = doc.data()
        console.log(documents)
      })
    }

    req()
  }, [isEmpty])

  const handleChange = (e) => {
    const input = e.target
    const name = input.name
    const value = input.value
    setEmployees({
      ...employees,
      [name]: value
    })
  }

  const createEmployee = async (e) => {
    try {
      e.preventDefault()
      await addDoc(collection(db, "employees"), employees)
      setIsEmpty(false)
      new Swal({
        icon: 'success',
        title: 'Employee Created !'
      })
    }
    catch (err) {
      new Swal({
        icon: 'error',
        title: 'Failed !',
        text: err.message
      })
    }
    finally {
      setEmployees(model)
    }
  }

  return (
    <div className="flex flex-col items-center gap-18">
      <h1 className="text-5xl font-bold">MaheshCodding-Hub <span className="text-indigo-600">CRUD</span></h1>
      <div className="grid grid-cols-2 w-8/12 gap-16">
        <div>
          <form className="space-y-6" onSubmit={createEmployee}>
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">Employee Name</label>
              <input
                onChange={handleChange}
                required
                name="employeeName"
                className="p-3 rounded border border-gray-300"
                placeholder="Employee name"
                value={employees.employeeName}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">Salary</label>
              <input
                onChange={handleChange}
                type="number"
                required
                name="salary"
                className="p-3 rounded border border-gray-300"
                placeholder="Salary"
                value={employees.salary}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2">Joining Date</label>
              <input
                onChange={handleChange}
                type="date"
                required
                name="joiningDate"
                className="p-3 rounded border border-gray-300"
                value={employees.joiningDate}
              />
            </div>

            <button className="bg-green-500 px-6 py-3 rounded font-semibold text-white">CREATE</button>
          </form>
        </div>
        <div>
          {
            isEmpty &&
            <div className='flex flex-col items-center'>
              <FcEmptyTrash className='text-3xl text-grey-500' />
              <h1 className='text-3xl text-gray-500'>Empty</h1>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App