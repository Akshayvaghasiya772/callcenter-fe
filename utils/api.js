import { toast } from "@/hooks/use-toast";
import axios from 'axios';

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
      toast({
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
      toast({
        title:error?.response?.data?.message
      })
    })
}