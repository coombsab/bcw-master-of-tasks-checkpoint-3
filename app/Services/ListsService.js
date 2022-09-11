import { appState } from "../AppState.js"
import { ListsController } from "../Controllers/ListsController.js"
import { List } from "../Models/List.js"
import { saveState } from "../Utils/Store.js"

class ListsService {
  constructor() {
    
  }
  toggleItems(listId) {
    let element = document.getElementById(`collapsible-items-${listId}`)
    let list = appState.lists.find(list => list.id === listId)
    if (!list) {
      throw new Error("Invalid List")
    }
    if(!list.areItemsToggled){
      // @ts-ignore
      element.style.height = 0
      // @ts-ignore
      element.style.overflow = "hidden"
      list.areItemsToggled = !list.areItemsToggled
    } else if (list.areItemsToggled) {
      // @ts-ignore
      element.style.height = "auto"
      // @ts-ignore
      element.style.overflow = "auto"
      list.areItemsToggled = !list.areItemsToggled
    }
    saveState("lists", appState.lists)
    appState.emit("lists")

  }
  removeList(listId) {
    appState.lists = appState.lists.filter(list => list.id !== listId)
    saveState("lists", appState.lists)
  }
  createList(formData) {
    let list = new List(formData)
    // console.log(list.id)
    // this.makeListDraggable(list.id)
    appState.lists = [list, ...appState.lists]
    saveState("lists", appState.lists)
  }

  makeListDraggable(listId) {
    _makeDraggable(listId)
  }
}

function _makeDraggable(listId) {
  console.log("listId", listId)
  // @ts-ignore
  let listElement = document.getElementById(`draggable-list-${listId}`)
  console.log("trying to make draggable",`draggable-list-${listId}`, listElement)
  function _dragList(listElement) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
    let elemId = listElement.id
    if(document.getElementById(elemId + "header")) {
      // @ts-ignore
      document.getElementById(elemId + "header").onmousedown = _dragMouseDown;
    }
    function _dragMouseDown(event) {
      event = event || window.event
      event.preventDefault()
      pos3 = event.clientX
      pos4 = event.clientY
      document.onmouseup = _closeDragElement
      document.onmousemove = _elementDrag
    }
    
    function _elementDrag(event) {
      event = event || window.event
      event.preventDefault()
      pos1 = pos3 - event.clientX
      pos2 = pos4 - event.clientY
      pos3 = event.clientX
      pos4 = event.clientY
      listElement.style.top = (listElement.offsetTop - pos2) + "px"
      listElement.style.left = (listElement.offsetLeft - pos1) + "px"
    }
    
    function _closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}

export const listsService = new ListsService()