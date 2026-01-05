import { useState } from 'react'
import { useForm } from 'react-hook-form'

import './App.css'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const [students, setStudents] = useState([])

  const onFormSubmit = (data) => {
    setStudents((prev) => [...prev, data])
    toast.success('Sucessfully Added')
    reset()
  }

  const onReset = () => {
    reset()
  }

  const onDeleteRecord=(idx)=>
  {
    const filtered= students.filter((temp,index)=> index != idx) 
    toast.success('Sucessfully deleted')
    setStudents(filtered)
  }

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toasterId="default"
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <div className="container">
        <div className="form-container">
          <h2>Add Student</h2>
          <form onSubmit={handleSubmit(onFormSubmit)} onReset={onReset}>
            <div className="input-field">
              <label>Full Name</label>
              <div className="input-with-icon">
                <i className='ri-user-line'></i>
                <input {...register('fullname', { required: 'Full name is required' })} type='text' />
              </div>
              {errors.fullname && (
                <p style={{ color: 'red', fontSize: '12px', fontWeight: 500, marginTop: '8px' }}>{errors.fullname.message}</p>
              )}
            </div>
            <div className="input-field">
              <label>Email Address</label>
              <div className="input-with-icon">
                <i className='ri-mail-fill'></i>
                <input {...register('email', { required: 'Email Address is required' })} type='email' />
              </div>
              {errors.email && (
                <p style={{ color: 'red', fontSize: '12px', fontWeight: 500, marginTop: '8px' }}>{errors.email.message}</p>
              )}
            </div>
            <div className="input-field">
              <label>Mobile no</label>
              <div className="input-with-icon">
                <i className='ri-phone-fill'></i>
                <input {...register('mobileno', { required: 'Mobile No. is required' })} type='number' />
              </div>
              {errors.mobileno && (
                <p style={{ color: 'red', fontSize: '12px', fontWeight: 500, marginTop: '8px' }}>{errors.mobileno.message}</p>
              )}
            </div>
            <div className="action-button">
              <button type='submit'> Add Records</button>
              <button type='reset'>Cancel</button>
            </div>
          </form>
        </div>
        <div className="table-container">
          <h2>Student Details</h2>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Mobile No</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={"5"}>No Student Found</td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={`${student.email}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{student.fullname}</td>
                    <td>{student.email}</td>
                    <td>{student.mobileno}</td>
                    <i onClick={()=>onDeleteRecord(index)} className='ri-delete-bin-5-line'title='Delete record'></i>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
