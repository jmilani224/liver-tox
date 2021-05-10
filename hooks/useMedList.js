import { useQuery } from 'react-query'

const useMedList = () => {
    const { isLoading, error, data } = useQuery("medList", () => fetchMedList())
    return [isLoading, error, data]
}

const fetchMedList = async () => {
    const res = await fetch(`api/scrapeLiverToxList`)
    const data = await res.json()
    return data
}

export default useMedList
