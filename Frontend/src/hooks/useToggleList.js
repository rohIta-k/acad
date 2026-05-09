import { useState } from 'react'

export function useToggleList(initialItems = []) {
  const [items, setItems] = useState(initialItems)

  const toggleItem = (item) => {
    setItems((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    )
  }

  return { items, setItems, toggleItem }
}
