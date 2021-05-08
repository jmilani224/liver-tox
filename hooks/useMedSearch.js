import { useQuery } from 'react-query'

const useMedSearch = (input) => {
    const { isLoading, error, data } = useQuery(input, () => fetchMedData(input))
    return [isLoading, error, data]
}

const fetchMedData = async (input) => {
    const res = await fetch(`api/medSearch/?input=${input}`)
    const data = await res.json()
    return data
}

export default useMedSearch
