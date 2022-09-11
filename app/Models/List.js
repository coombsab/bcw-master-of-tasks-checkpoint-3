import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

/**
 * @param {{name: string, color: string, id: string, areItemsToggled: boolean}} List
 */
export class List {
  constructor(data) {
    this.name = data.name
    this.color = data.color
    this.id = data.id || generateId()
    this.areItemsToggled = data.areItemsToggled || false
  }

  get Template() {
    return /*html*/`
      <div class="col-12 col-md-5 col-lg-4 col-xl-3 mb-2 mb-md-4 draggable" id="draggable-list-${this.id}">
        <div class="card d-flex flex-column rounded elevation-1">
          <div class="rounded d-flex flex-column" style="background-color: ${this.color}">
            <div class="rounded d-flex justify-content-between">
              <i class="mdi mdi-star-face text-bubble selectable" onclick="app.listsController.toggleItems('${this.id}')"></i>
              <i class="mdi mdi-close-box align-self-end selectable text-bubble" onclick="app.listsController.removeList('${this.id}')" title="Delete List"></i>
            </div>
            <div class="card-header d-flex flex-column justify-content-center align-items-center">
                <h4 class="text-bubble">${this.name.toUpperCase()}</h4>
                <p class="text-bubble">${this.UnCheckedItems.length}/${this.Items.length}</p>
            </div>
          </div>
          <div class="card-body">
            <div id="collapsible-items-${this.id}">
              <!-- SECTION items -->
              ${!this.areItemsToggled ? this.ItemsTemplate : ""}
            </div>
          </div>
          <div class="card-footer">
            <form onsubmit="app.itemsController.createItem('${this.id}')" class="d-flex gap-2 mt-2">
              <input type="text" name="name" class="w-100 rounded" required minlength="3" maxlength="25" placeholder="Item Name">
              <button class="btn btn-primary" type="submit"><i class="mdi mdi-plus" title="Add Item To List"></i></button>
            </form>
          </div>
        </div>
      </div>
    `
   }

  get ItemsTemplate() {
    let template = ""
    this.Items.forEach(item => template += item.Template)
    return template
  }

  get UnCheckedItems() {
    return appState.items.filter(item => item.listId === this.id && !item.isChecked)
  }

  get Items() {
    return appState.items.filter(item => item.listId === this.id)
  }
}