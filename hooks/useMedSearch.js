import { useQuery } from 'react-query'

const useMedSearch = (input) => {
    if (!input) {
        const { isLoading, isSuccess, isError, isIdle, data, error, refetch } = useQuery("initial", () => fetchMedData(input), {
            enabled: false,
        })
        return [isLoading, isSuccess, isError, isIdle, data, error, refetch]
    }

    const { isLoading, isSuccess, isError, isIdle, data, error, refetch } = useQuery(input.name, () => fetchMedData(input), {
        enabled: false,
    })
    return [isLoading, isSuccess, isError, isIdle, data, error, refetch]

}

const fetchMedData = async (input) => {
    const res = await fetch(`api/scrapeLiverToxContent/?input=${input.name}&href=${input.href}`)
    if (res.status === 500) {
        throw new Error('BROKEN')
    } else {
        const data = await res.json()
        return data
    }
}

export default useMedSearch
