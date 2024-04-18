
import React , {useState} from 'react';
import './publish.css';



const Posts = (props) => {


    const [note , setNote] = useState({
        title : "",
        post : ""

    });


    const onChange = (event) => {
        const {name , value } = event.target;
        

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
            
        });
    }

    const onSubmit = (event) => {
        
            props.onAdd(note);
            setNote({
                title: "",
                post: ""
            });
            
            event.preventDefault();
    }




return(
    


    <div className='create'>
        <form onSubmit={onSubmit}>  
                  <div className='title' >
            <p>Title : </p>
            <input type="text" name='title' value={note.title} onChange={onChange} className='title-input' placeholder='' ></input>
        </div>
        <div className='create-post'>
            <p>Post : </p>
            <textarea name='post' value={note.post} onChange={onChange} className='post-input' placeholder='' ></textarea>
        </div>
        <button className='publish'  >
            <span>Create</span>
        </button>
        </form>

    </div>
    
    
    )
}

export default Posts;

