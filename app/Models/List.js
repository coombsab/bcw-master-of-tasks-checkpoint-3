import { appState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"

/**
 * @param {{name: string, color: string, id: string}} List
 */
export class List {
  constructor(data) {
    this.name = data.name
    this.color = data.color
    this.id = data.id || generateId()
  }

  get Template() {
    return /*html*/`
      <div class="col-12 col-md-5 col-lg-4 col-xl-3 mb-2 mb-md-4">
        <div class="card d-flex flex-column p-3 elevation-1">
          <i class="mdi mdi-close-box align-self-end selectable" onclick="app.listsController.removeList('${this.id}')"></i>
          <div class="card-header text-center">
            <h4>${this.name.toUpperCase()}</h4>
            <p>${this.UnCheckedItems.length}/${this.Items.length}</p>
          </div>
          <div class="card-body">
            <div>
              <!-- SECTION items -->
              ${this.ItemsTemplate}
            </div>
          </div>
          <div class="card-footer">
            <form onsubmit="app.itemsController.createItem('${this.id}')" class="d-flex gap-2 mt-2">
              <input type="text" name="name" class="w-100 rounded" required minlength="3" maxlength="15">
              <button class="btn btn-primary" type="submit"><i class="mdi mdi-plus"></i></button>
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