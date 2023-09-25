import { FaEdit } from 'react-icons/fa'
import { useMutation } from "@apollo/client"
import { useState } from "react"
import { GET_PROJECT } from "../queries/projectQueries"
import { UPDATE_PROJECT } from "../mutations/projectMutations"

export default function EditProjectModal({ project }) {
  
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState('')  

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]

  })

  const onSubmit = (e) => {
    e.preventDefault()

    if(!name || !description || !status)
      return alert('Please fill in all fields')
    
    updateProject(name, description, status)
    
  }

  return (<>
    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProjectModal">
      <div className="d-flex align-items-center">
        <FaEdit className='me-1' /> Edit Project
      </div>
    </button>

    <div className="modal fade" id="editProjectModal"  aria-labelledby="editProjectModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProjectModalLabel">Edit Project</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="new">Not Started</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" data-bs-dismiss='modal'>Submit</button>

            </form>
          </div>

        </div>
      </div>
    </div>
  </>)
}
