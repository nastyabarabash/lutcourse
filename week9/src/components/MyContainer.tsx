import { useState } from "react";
import MyList, { TItem } from "./MyList";

function MyContainer() {
  const header: string = "this is list header"

  const [items, setItems] = useState<TItem[]>([
    { id: "1", text: "First task", clicked: false },
    { id: "2", text: "Second task", clicked: false },
    { id: "3", text: "Third task", clicked: false },
  ])

  const [newText, setNewText] = useState("")

  const addItem = () => {
    if (newText.trim() === "") return;

    const newItem: TItem = {
      id: Date.now().toString(),
      text: newText,
      clicked: false,
    }

    setItems([...items, newItem])
    setNewText("")
  }

  const updateList = (id: string): void => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, clicked: !item.clicked }
          : item
      )
    );
  };

  return (
    <div>
      <textarea
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
      />
      <br />
      <button onClick={addItem}>Add item</button>

      <MyList header={header} items={items} updateList={updateList} />
    </div>
  );
}

export default MyContainer