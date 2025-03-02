import { useEffect, useState } from "react"
import axios from "axios"

const useFetch = (url) =>{
     const [data , setData] = useState([])
     const [loading , setLoading] = useState(false)
     const [error , setError] = useState(false)

     useEffect(()=>{
         const fetchData = async ()=>{
              setLoading(true)
              try {
                const res = await axios.get(url);
                if(Array.isArray(res.data)){
                   setData(res.data);
                }else if(res.data && Array.isArray(res.data.hotels)){
                    setData(res.data.hotels);
                }else{
                   setData([]);
                }
              } catch (error) {
                 console.error("fetch error:", error);
                 setError(error)  
              }
              setLoading(false);
         };
         fetchData();
     },[url]);


      const reFetch = async ()=>{
         setLoading(true);
         try {
            const res = await axios.get(url);
            setData(res.data);
         } catch (error) {
            setError(error);
         }
         setLoading(false)
      };

      return {data,loading,error , reFetch}

};

export default useFetch;


