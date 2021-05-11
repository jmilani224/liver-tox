import { useQuery } from 'react-query'

const useMedSearch = (input) => {
    const { isLoading, isSuccess, isError, isIdle, data, error, refetch } = useQuery(input, () => fetchMedData(input), {
        enabled: false,
    })
    return [isLoading, isSuccess, isError, isIdle, data, error, refetch]
}

const fetchMedData = async (input) => {
    const res = await fetch(`api/scrapeLiverToxContent/?input=${input}`)
    const data = await res.json()
    return data
}

export default useMedSearch
