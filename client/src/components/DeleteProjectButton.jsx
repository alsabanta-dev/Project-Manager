import {FaTrash} from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client"
import { GET_PROJECTS } from "../queries/projectQueries"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function DeleteProjectButton({ projectId }) {

  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {id: projectId},
    onCompleted: () => navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }]
  })

  return (<>
      <button className="btn btn-danger" onClick={deleteProject}>
        <div className="d-flex align-items-center">
          <FaTrash className='me-1'/> Delete Project
        </div>
      </button>
  </>)
}
