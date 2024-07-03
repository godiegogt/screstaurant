//Convert LATAM format to US
export const ConvertDateToUSA=(date:string)=>{
    return `${date.split('/')[1]}/${date.split('/')[0]}/${date.split('/')[2]}`
    }
    
    export const convertDateToString=(input:Date)=>{
    
        try {
         return (input.getDate()<10?("0"+(input.getDate()).toString()):(input.getDate()+1))+"/"+((input.getMonth()+1)<10?("0"+(input.getMonth()+1).toString()):input.getMonth()+1)+"/"+input.getFullYear()
        } catch (error) {
         console.log('Date error           ')
        }
    
     };

     export const getTime=(date:Date)=>{
        
        try {
            return date.getHours()+":"+date.getMinutes();
           } catch (error) {
            console.log('Date error           ')
           }
     }