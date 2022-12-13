import React from 'react'
import { useParams, Link } from 'react-router-dom'
import DonationForm from './DonationForm'
import UpdateDonation from './UpdateDonation'
import DeleteDonation from './DeleteDonation'

const RecipientDonationCard = ({ user }) => {

    let { id } = useParams()
   

    const donations = user.donations.filter((donation) => donation.recipient.id == id)
    const recipient = user.recipients.map((recipient)=>{
      if(recipient.id == id) {
        return recipient
      }
    })[0]

    const mappedDonations = donations.map((donation) => {
      return (
          <>
              <li key={donation.id}>Donation: ${donation.amount} | Date: {donation.created_at.slice(0, 10)}</li>
              <Link className="btn" element={<UpdateDonation user={user} />} to={`/me/donations/${donation.id}`}>Edit Donation</Link>
              <Link className="btn" element={<DeleteDonation user={user} />} to={`/me/donations/${donation.id}`}>Delete Donation</Link>
          </>
          )
  })

  return (
    <div>
        <img src={recipient.logo} />
        <h1>{recipient.name}</h1>
        <p>{recipient.description}</p>
        <span>{recipient.category}</span>
        <h3>Make Another Donation</h3>
        <DonationForm recipient={recipient} />
        <ul>
            <h4>My Previous Donations</h4>
            {mappedDonations}
        </ul>
    </div>
  )
}

export default RecipientDonationCard