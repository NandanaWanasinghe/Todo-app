import axios from "axios";
import React, { useEffect, useState } from "react";
import  {Modal} from "react-bootstrap";


const TodoList:React.FC = () =>{

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const saveTodo = async()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/v1/todos/create',{
            title,description
        });
        setTitle(''),
        setDescription('')
        console.log(response);
        
        }catch(e){
            console.log(e);
            
        }
    }
    const [todos,setTodos] = useState([]);
    useEffect(()=>{
        findAllTodos();
    },[]);

    const findAllTodos = async () =>{
        const response = await axios.get('http://localhost:3000/api/v1/todos/find-all');
        setTodos(response.data);
        console.log(response);
    }
    const deleteTodo= async (id: string)=>{
        await axios.delete('http://localhost:3000/api/v1/todos/delete-by-id/'+id);
    }

    const [modalState, setModalState]=useState<boolean>(false);

    const [selectedTodoId,setSelectedTodoId]=useState('');

    const [updateaTitle,setUpdateTitle]=useState('');
    const [updateDescription,setUpdateDescription]=useState('');

    const updateCustomer= async ()=>{
        try{

            await axios.put('http://localhost:3000/api/v1/todos/update/'+selectedTodoId,{
                title:setUpdateTitle,description:setUpdateDescription
            });
            setModalState(false);
            findAllTodos();

        }catch (e){
            console.log(e)
        }
    }

    const loadModal= async (id: string)=>{
        const todo = await axios.get('http://localhost:3000/api/v1/todos/find-by-id/'+id);
        console.log(todo.data)
        setSelectedTodoId(todo.data.id)
        setUpdateTitle(todo.data.title)
        setUpdateDescription(todo.data.description)

        setModalState(true);
    }
    return(
        <>
        <br />
        <div className="container">
            <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="form-group">
                        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" id="customerName" className="form-control" placeholder="Title"/>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                    <div className="form-group">
                        <input value={description} onChange={(e)=>{setDescription(e.target.value)}} type="text" id="customerAddress" className="form-control" placeholder="Description"/>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <button onClick={saveTodo} className="btn btn-dark col-12">Save Customer</button>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-12">
                    <table className="table table-hover table-bordered">
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Delete Option</th>
                            <th>Update Option</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo,index)=>(
                            <tr key={index}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button
                                     onClick={(id)=>{
                                        if (confirm('are you sure?')){
                                            deleteTodo(id);
                                    }}}
                                    className="btn btn-outline-danger">Delete</button>
                                </td>
                            <td>
                            <button
                                            onClick={()=>{
                                                loadModal(todo.id);
                                            }}
                                            className="btn btn-outline-success">Update</button>
                            </td>
                        </tr>
                        ))}
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/*==============================*/}

        <Modal show={modalState}>

            <div className='p-4'>
                <h2>Update Customer</h2>
                <hr/>

                <div className="col-12">
                    <div className="form-group">
                        <input type="text" defaultValue={updateaTitle}
                               onChange={(e)=>setUpdateTitle(e.target.value)}
                               className='form-control'/>
                    </div>
                    <br/>
                </div>
                <div className="col-12">
                    <div className="form-group">
                        <input
                            onChange={(e)=>setUpdateDescription(e.target.value)}
                            type="text" defaultValue={updateDescription} className='form-control'/>
                    </div>
                    <br/>
                </div>
                <div className="col-12">
                    <button type='button' className='btn-success btn col-12'
                            onClick={()=>updateCustomer()}
                    >Update Customer</button>
                    <br/>
                    <br/>
                    <button type='button' className='btn-secondary btn col-12' onClick={()=>setModalState(false)}>Close Modal</button>
                </div>

            </div>

        </Modal>


        {/*==============================*/}

        </>
    );
}
    

export default TodoList;