import { useDispatch } from "react-redux";
import articlesService from "../services/ArticlesService"
import {updateCategories as updateCategories2} from '../features/configurations/configurationSlice'
import { useState } from "react";

const useArticles = () => {
const dispatch=useDispatch();
const [isLoading, setisLoading] = useState(false)
   

const updateCategories= async()=>{
        let categories= null;
       try {
        setisLoading(true)
       categories= await articlesService.getCategories();
        if(categories.length>0){
            dispatch(updateCategories2(categories))
        }
       } catch (error) {
       

       }finally{
        setisLoading(false);
        return categories;
       }

    }

  return (
   {
    updateCategories,
    isLoading
   })
}

export default useArticles
