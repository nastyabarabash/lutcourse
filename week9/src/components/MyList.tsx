export type TItem = {
  id: string
  text: string
  clicked: boolean
}

export interface ListProps {
  header: string
  items: TItem[]
}

const MyList: React.FC<ListProps> = ({ header, items }) => {
  return (
    <div>
      <h2>{header}</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ol>
    </div>
  )
}

export default MyList