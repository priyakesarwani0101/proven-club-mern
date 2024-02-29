import { useState } from 'react'
import Form from './Form'
const Card = ({ book }) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [iseReturn, setIsReturn] = useState(false)

    const handleCheckout = () => {
        console.log(book);
        setIsCheckout(true)
    }
    const handleReturn = () => {
        console.log(book);
    }
    return (
        <>

            {
                isCheckout ? (
                    <Form bookId={book.BookID} setIsCheckout={setIsCheckout} />
                ) :
                    <div style={{ border: '2px solid blue', padding: '20px', margin: '20px' }}>
                        <p>Book Name : {book.BookName}</p>
                        <p>Quantity Available : {book.NumberOfCopies} </p>
                        <button onClick={handleCheckout}>Checkout</button>
                        <button onClick={handleReturn}>Return</button>
                    </div>

            }
        </>
    )
}

export default Card;