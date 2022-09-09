import { generateId } from "../Utils/generateId.js"

/**
 * @param {{name: string, id: string}} Item
 */
export class Item {
  constructor(data) {
    this.name = data.name
    this.id = data.id || generateId()
    this.listId = data.listId
    this.isChecked = data.isChecked || false
  }

  get Template() {
    return /*html*/`
      <div class="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-1 ${this.isChecked ? 'text-blue' : ''}">
        <div class="d-flex align-items-center gap-2">
          <form>
            <input type="checkbox" onchange="app.itemsController.toggleIsChecked('${this.id}')" ${this.isChecked ? "checked" : ""}>
          </form>
          <p>${this.name.toUpperCase()}</p>
        </div>
        <i class="mdi mdi-delete selectable" onclick="app.itemsController.removeItem('${this.id}')"></i>
      </div>
    `
  }
}