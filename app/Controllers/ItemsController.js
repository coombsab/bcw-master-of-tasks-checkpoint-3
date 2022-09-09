import { appState } from "../AppState.js"
import { itemsService } from "../Services/ItemsService.js"
import { getFormData } from "../Utils/FormHandler.js"

export class ItemsController {
  constructor() {

  }

  createItem(listId) {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)
      // @ts-ignore
      formData.listId = listId
      itemsService.createItem(formData)
      // @ts-ignore
      // form.reset()
    } catch (error) {
      console.error("createItem", error)
    }
  }

  removeItem(itemId) {
    let item = appState.items.find(item => item.id === itemId)
    let message = "Delete this item?"
    if (item) {
      // @ts-ignore
      message = "Delete " + item.name + "?"
    }

    if (window.confirm(message)) {
      itemsService.removeItem(itemId)
    }
  }

  toggleIsChecked(itemId) {
    itemsService.toggleIsChecked(itemId)
  }
}