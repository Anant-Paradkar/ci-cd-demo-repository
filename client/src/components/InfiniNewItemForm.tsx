import { postItem } from '../apis/api-utils'
import { useState } from 'react'

type InfiniNewItemFormProps = {
  serverAddress: string,
  apiPath: string,
  itemType: string,
  fieldList: Array<string>,
  sampleItem: any,
}
type FormTuple = {
  name: string,
  value: string,
}

const InfiniNewItemForm = ({ serverAddress, apiPath, itemType, fieldList, sampleItem }: InfiniNewItemFormProps) => {

  const [ formData, setFormData ] = useState<Array<FormTuple>>(
    fieldList.map(field => ({ name: field, value: sampleItem[ field ] }))
  )

  const isValid = (text: string) => text && text.trim() && text.trim().length && typeof text === 'string'

  const handleSave = () => {
    console.log('handleSave: new ', itemType, ', data=', formData)
    if (!formData.every((tuple) => isValid(tuple.value))) {
      console.log('Form data invalid')
      return
    }
    const payload: any = {}
    formData.forEach((tuple: FormTuple) => {
      payload[ tuple.name ] = tuple.value
    })
    postItem(serverAddress, apiPath, payload)
      .then((response) => {
        console.log('SAVED!', response)
        alert(`New ${itemType} created`)
      })
  }

  return (
    <div className='newItemForm'>
      <h2>New {itemType}:</h2>
      {
        formData.map((tuple, index) => (
          <div key={`itemType-${tuple.name}`} className='newItemInputHolder'>
            <label htmlFor={`input-${tuple.name}`}>{tuple.name}</label>
                        &nbsp;
            <input id={`input-${tuple.name}`}
              defaultValue={formData[ index ].value}
              className={isValid(formData[ index ].value) ? 'formValid' : 'formInvalid'}
              onChange={(event) => {
                const newData = [ ...formData ]
                newData[ index ].value = event.target.value
                setFormData(newData)
              }}
            />
          </div>
        ))
      }
      <button onClick={handleSave} className='newItemButton'>Save New {itemType}</button>
    </div>
  )
}

export default InfiniNewItemForm
