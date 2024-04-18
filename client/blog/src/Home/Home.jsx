import React , {useState} from 'react';
import './home.css'
import Posts from './Posts.jsx';
import Header from '../Header/Header.jsx';
import Note from './Note.jsx';
import Register from '../Register/Register.jsx';
const Home = () => {
    const [notes, setNotes] = useState([]);
    
    
    const addNote = (newNote) => {
        setNotes(prevNotes => {
            return [...prevNotes, newNote]
        });
    }

    const deleteNote = (id) => {
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id;
            })
        })
    }

    return (
        <div>
            <Header />
            <div className='home-page'>
                <div className='text'>
                    <h1></h1>
                   

                    <input type="text" className='find-users' placeholder="Search for pet owners" ></input>
                    <button className='btn'>Search</button>
                </div>
                <div className='posts-container' >
                    <Posts onAdd={addNote}/>
                    <div className='posts'>
                        <p>Posts</p>
                        {notes.map((noteItem, index) => {
                            return (
                                <Note
                                    key={index}
                                    id={index}
                                    title={noteItem.title}
                                    content={noteItem.post}
                                    onDelete={deleteNote} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

