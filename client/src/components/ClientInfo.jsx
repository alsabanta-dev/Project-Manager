import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa'

export default function ClientInfo({client}) {
  return (<>
  <h5 className="mt-5">Client Information</h5>
  <ul className="list-group">
    <li className="list-group-item">
      <FaUser className='me-3'/> 
      {client.name}
    </li>
    <li className="list-group-item">
      <FaEnvelope className='me-3'/> 
      {client.email}
    </li>
    <li className="list-group-item">
      <FaPhone className='me-3'/> 
      {client.phone}
    </li>
  </ul>
  </>)
}
