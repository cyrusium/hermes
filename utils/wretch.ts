import wretch from 'wretch'
import Abort from "wretch/addons/abort"

const BASE_URL = 'http://localhost:3000/api'
const fetcher = wretch(BASE_URL)
  // .options({ credentials: 'include', mode: 'cors' })
  .addon(Abort())

export default fetcher