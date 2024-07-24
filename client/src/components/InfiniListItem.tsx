import GigFlyerLink from './GigFlyerLink'

const convertToKeysAndValues = (itemData: any) => {
  // convert { name: bob, location: Leeds }
  // to [ { key: name, value: bob}, { key: location, value: Leeds} ]
  const allKeys = Object.keys(itemData)
  const tuples = allKeys.map((keyName) => {
    let result = itemData[keyName]
    if (typeof result === 'object') {
      result = JSON.stringify(result, null, 1)
    }
    return { key: keyName, value: result }
  })
  return tuples
}

type InfiniListItemProps = {
  itemData: any,
  listName: string,
  idKey: string,
  addFlyerLink?: boolean,
  flyersAddress?: string,
}

const InfiniListItem = ({ itemData, listName, idKey, addFlyerLink = false, flyersAddress = '' }: InfiniListItemProps) => {
  // convert { name: bob, location: Leeds }
  // to [ { key: name, value: bob}, { key: location, value: Leeds} ]
  const tuplesList = convertToKeysAndValues(itemData)
  const masterKey = itemData[idKey] || '-1'

  return (
    <li className={`infini-list-item ${listName}-item`} id={`${listName}-${masterKey}`} >
      {tuplesList.map((tuple, index) => (
        <div className='dataItem' key={`${masterKey}-${index}`}>
          <span className='dataKey'>{tuple.key}</span>
          &nbsp;
          <span className='dataValue'>{tuple.value}</span>
        </div>
      ))}
      {addFlyerLink && <GigFlyerLink gigData={itemData} flyersAddress={flyersAddress} />}
    </li>
  )
}

export default InfiniListItem
