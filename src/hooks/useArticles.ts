import { useDispatch } from "react-redux";
import articlesService from "../services/ArticlesService"
import {updateCategories as updateCategories2} from '../features/configurations/configurationSlice'

const useArticles = () => {
const dispatch=useDispatch()
    const updateCategories= async()=>{
        const categories= await articlesService.getCategories();
        if(categories.length>0){
            dispatch(updateCategories2(categories))
        }

    }

  return (
   {
    updateCategories
   })
}

export default useArticles
