
export const pingApi = async (serverAddress: string, path: string) => {
  try {
    const urlPath = `${serverAddress}/${path}`
    console.log('pingApi called: urlPath=', serverAddress)
    console.log('pingApi...', urlPath)
    const result = await fetch(urlPath)
    const data = await result.json()
    return data
  }
  catch (error) {
    console.error('Error in pingApi:', error)
    throw error
  }
}

export const getItems = async (serverAddress: string, path: string) => {
  try {
    const urlPath = `${serverAddress}/${path}`
    console.log('getItems called: urlPath=', urlPath)
    const result = await fetch(urlPath)
    const data = await result.json()
    return data
  }
  catch (error) {
    console.error('Error in getItems:', error)
    throw error
  }
}

export const postItem = async (serverAddress: string, path: string, payload: any) => {
  try {
    const urlPath = `${serverAddress}/${path}`
    console.log('postItem...', urlPath, 'payload=', payload)
    const result = await fetch(urlPath, {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(payload),
    })
    const data = await result.json()
    return data
  }
  catch (error) {
    console.error('Error in postItem:', error)
    throw error
  }
}
