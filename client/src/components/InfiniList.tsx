import InfiniListItem from './InfiniListItem'

type InfiniListProps = {
  listOfItems: Array<any>,
  listName: string,
  idKey: string,
  addFlyerLink?: boolean,
  flyersAddress?: string,
}

const InfiniList = ({ listOfItems, listName, idKey, addFlyerLink = false, flyersAddress = '' }: InfiniListProps) => {
  return (
    <div className='listOfItems'>
      <ul id={listName} className={`infini-list ${listName}`}>
        {listOfItems.map((itemObject) =>
          <InfiniListItem
            key={itemObject[idKey] || '-1'}
            idKey={idKey}
            itemData={itemObject}
            listName={listName}
            addFlyerLink={addFlyerLink}
            flyersAddress={flyersAddress}
          />
        )}
      </ul>
    </div>
  )
}

export default InfiniList
