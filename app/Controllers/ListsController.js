import { appState } from "../AppState.js"
import { listsService } from "../Services/ListsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { setHTML } from "../Utils/Writer.js"

function _drawLists() {
  let template = ""
  appState.lists.forEach(list => template+= list.Template)
  setHTML("lists", template)
}

export class ListsController {
  constructor() {
    _drawLists()
    appState.on("lists", _drawLists)
    appState.on("items", _drawLists)
  }

  createList() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)
      // @ts-ignore
      // console.log("color", formData.color)
      listsService.createList(formData)
      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error("createList", error)
    }
  }

  removeList(listId) {
    let list = appState.lists.find(list => list.id === listId)
    let message = "Delete this list?"
    if (list) {
      // @ts-ignore
      message = "Delete " + list.name.toUpperCase() + "?"
    }
    if (window.confirm(message)) {
      listsService.removeList(listId)
    }
  }

  toggleItems(listId) {
    listsService.toggleItems(listId)
  }

  uncollapseItems(listId) {
    listsService.uncollapseItems(listId)
  }
}