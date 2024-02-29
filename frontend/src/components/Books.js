import { useEffect, useState } from 'react'
import Card from './Card'
const Books = () => {
    const [books, setBooks] = useState([]);

    const fetchData = async () => {
        const response = await fetch('http://localhost:3002/books/available');
        console.log(response);
        const data = await response.json();
        console.log(data);
        setBooks(data);
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            <h1>Books Library=</h1>
            <div style={{ width: '300px', display: 'flex', margin: '20px', justifyContent: 'space-evenly', gap: '20px' }}>
                {books.map(book => (
                    <Card key={book.id} book={book} />
                ))}
            </div>
        </>
    )
}

export default Books;