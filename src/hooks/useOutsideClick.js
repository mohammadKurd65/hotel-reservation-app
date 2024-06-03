import { useEffect } from "react";

export default function useOusideClick(ref,excepyionId, cb){
    useEffect(()=>{
        function handlerOutsideClick(event){
if(ref.current && !ref.current.contains(event.target) && event.target.id !== excepyionId){
cb()
}
        }
        document.addEventListener("mousedown", handlerOutsideClick)
        return()=>{
            document.removeEventListener("mousedown", handlerOutsideClick)
        }
    },[ref, cb, excepyionId])

}