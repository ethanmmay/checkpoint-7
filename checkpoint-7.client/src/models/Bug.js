export class Bug {
  constructor(data = {}) {
    this.id = data.id || data._id || ''
    this.title = data.title || ''
    this.description = data.description || ''
    this.closed = data.closed || false
    this.creator = data.creator || { name: 'unknown', picture: '//placehold.it/20x20' }
    this.createdAt = data.createdAt || ''
    this.updatedAt = data.updatedAt || ''
  }
}
