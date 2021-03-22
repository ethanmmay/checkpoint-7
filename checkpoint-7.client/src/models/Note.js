export class Note {
  constructor(data = {}) {
    this.id = data.id || data._id || ''
    this.body = data.body || ''
    this.bug = data.bug || ''
    this.creator = data.creator || { name: 'unknown', picture: '//placehold.it/20x20' }
    this.createdAt = data.createdAt || ''
    this.updatedAt = data.updatedAt || ''
  }
}
