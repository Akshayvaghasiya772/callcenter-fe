import axios from 'axios';
import { showToast } from "@/components/ToastComponent";
export const integrateGetApi = (url,stateValue,authToken) => {
  const headers = {
    'Content-Type': 'application/json',
    'auth-token': authToken,
  }
  axios
    .get(url, { headers })
    .then((response) => {
      stateValue(response.data)
    })
    .catch((error) => {
      console.log('error', error)
      showToast.error({
        title:error?.response?.data?.message
      })
    })
}

export const integrateGetApiWithoutToken = (url,stateValue) => {
  axios
    .get(url)
    .then((response) => {
      stateValue(response.data)
    })
    .catch((error) => {
      console.log('error', error)
      showToast.error({
        title:error?.response?.data?.message
      })
    })
}