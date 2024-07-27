
import { useDispatch } from 'react-redux'
import { getParams } from '../features/configurations/ConfigServices'
import { updateParams } from '../features/configurations/configurationSlice'
import { useState } from 'react';

const useConfiguration = () => {
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState(false)

    const _updateParams = async () => {
        let response=null;
        try {
            setisLoading(true);
            response = await getParams();
        if (response != null) {
           
            dispatch(updateParams(response));
        }
        } catch (error) {
          
        }finally{
            setisLoading(false);
            return response
        }

    }

    return (
        {
            updateParams: _updateParams,
            isLoading
        }
    )
}

export default useConfiguration
