import { appState } from "../AppState.js"
import { Item } from "../Models/Item.js"
import { saveState } from "../Utils/Store.js"

class ItemsService {
  toggleIsChecked(itemId) {
    let item = appState.items.find(item => item.id === itemId)
    if (!item) {
      throw new Error("Invalid Item ID")
    }
    item.isChecked = !item.isChecked
    saveState("items", appState.items)
    appState.emit("items")
  }
  removeItem(itemId) {
    appState.items = appState.items.filter(item => item.id !== itemId)
    saveState("items", appState.items)
  }
  createItem(formData) {
    let item = new Item(formData)
    appState.items = [...appState.items, item]
    saveState("items", appState.items)
  }
  constructor() {

  }
}

export const itemsService = new ItemsService()