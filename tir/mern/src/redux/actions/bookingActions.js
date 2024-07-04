import axios from 'axios';
import { message } from 'antd';

export const bookCar=(reqObj)=>async dispatch=>{
    console.log(reqObj)
    dispatch({type: 'LOADING', payload:true})
        try {
        const response = await axios.post('http://localhost:8000/api/bookings',reqObj)
        console.log(response);
        window.location = response.data.url;
        
        dispatch({type: 'LOADING', payload:false})
        
        
        } catch (error){
            console.log(error);
            window.location = response.data.url;
            dispatch({type: 'LOADING', payload:false})
            message.error('something went wrong ')
        }

}
 


export const getAllBookings=()=>async dispatch=>{

    dispatch({type: 'LOADING', payload:true})
        try {
        const response = await axios.get('http://localhost:8000/api/bookings')
        dispatch({type: 'GET_ALL_BOOKINGS', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
        
        } catch (error){
            console.log(error);
            dispatch({type: 'LOADING', payload:false})
        }

}
