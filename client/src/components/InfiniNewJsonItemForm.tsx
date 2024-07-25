import { postItem } from '../apis/api-utils'
import { useState } from 'react'

type InfiniNewItemJsonFormProps = {
  serverAddress: string,
  apiPath: string,
  itemType: string,
  sampleItem: any,
}

const InfiniNewItemJsonForm = ({ serverAddress, apiPath, itemType, sampleItem }: InfiniNewItemJsonFormProps) => {

  const [ formData, setFormData ] = useState(sampleItem)

  const isValid = (text: string) => {
    if (text && text.trim() && text.trim().length && typeof text === 'string') {
      try {
        const paylodJson = JSON.parse(formData)
        console.log('JSON is valid:', paylodJson)
        return true
      } catch (error) {
        console.error('JSON is not valid:', error)
      }
    }
    return false
  }

  const handleSave = () => {
    console.log('handleSave: new ', itemType, ', data=', formData)
    if (!isValid(formData)) {
      return
    }
    const paylodJson = JSON.parse(formData)
    postItem(serverAddress, apiPath, paylodJson)
      .then((response) => {
        console.log('SAVED!', response)
        alert(`New ${itemType} created`)
      })

  }

  return (
    <div className='newItemForm'>
      <h2>New {itemType}:</h2>
      {
        <div key={`itemType-json`} className='newItemInputHolder'>
          <label htmlFor={`input-json`}>Json:</label>
                    &nbsp;
          <textarea id={`input-json`}
            rows={5}
            cols={50}
            defaultValue={formData}
            className={isValid(formData) ? 'formValid' : 'formInvalid'}
            onChange={(event) => {
              const newData = event.target.value
              setFormData(newData)
            }}
          />
        </div>
      }
      <button onClick={handleSave} className='newItemButton'>Save New {itemType}</button>
    </div>
  )
}

export default InfiniNewItemJsonForm
