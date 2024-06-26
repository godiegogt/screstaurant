
import { useDispatch } from 'react-redux'
import { getParams } from '../features/configurations/ConfigServices'
import { updateParams } from '../features/configurations/configurationSlice'

const useConfiguration = () => {
    const dispatch = useDispatch()

    const _updateParams = async () => {
        const response = await getParams();
        console.log('response: ', response)
        if (response != null) {
            dispatch(updateParams(response));
        }

    }

    return (
        {
            updateParams: _updateParams
        }
    )
}

export default useConfiguration
