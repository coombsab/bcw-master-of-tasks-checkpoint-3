import { appState } from "../AppState.js"
import { List } from "../Models/List.js"
import { saveState } from "../Utils/Store.js"

class ListsService {
  constructor() {
  
  }
  removeList(listId) {
    appState.lists = appState.lists.filter(list => list.id !== listId)
    saveState("lists", appState.lists)
  }
  createList(formData) {
    let list = new List(formData)
    appState.lists = [list, ...appState.lists]
    saveState("lists", appState.lists)
  }
}

export const listsService = new ListsService()