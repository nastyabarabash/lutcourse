export type TItem = {
  id: string
  text: string
  clicked: boolean
}

export interface ListProps {
  header: string
  items: TItem[]
  updateClickedItem: (id: string) => void
}

const MyList: React.FC<ListProps> = ({ header, items, updateClickedItem }) => {
  return (
    <div>
      <h2>{header}</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id} onClick={() => updateClickedItem(item.id)}
          style={{
            textDecoration: item.clicked ? "line-through" : "none",
            cursor: "pointer",
          }}>{item.text}</li>
        ))}
      </ol>
    </div>
  )
}

export default MyList