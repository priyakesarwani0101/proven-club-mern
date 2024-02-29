import { useState } from 'react';
import axios from 'axios';
const Form = ({ bookId, setIsCheckout }) => {
    const [memberId, setMemberId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/checkout', {
                BookID: bookId,
                MemberId: memberId
            })
            console.log(response.message);
            setIsCheckout(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Member Id</label>
                <input
                    type='text'
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Form;