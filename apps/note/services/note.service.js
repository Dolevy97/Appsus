import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { localStorageService } from '../../../services/storage.service.js'

let gDummyNotes
const NOTES_KEY = 'noteDB'

// Initialize notes if not already in localStorage
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    getDefaultFilter,
    save,
    getEmptyNote,
}

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = gDummyNotes
                _saveNotesToStorage()
            }
            
            // Filter by type
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, "i")
                notes = notes.filter((note) => regExp.test(note.type))
            }
            
            // Filter by text
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, "i")
                notes = notes.filter((note) => regExp.test(note.info.txt))
            }
            
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function getDefaultFilter() {
    return { text: '', type: '' }
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        const newNote = _createNote(note.title)
        return storageService.post(NOTES_KEY, newNote)
    }
}


function _saveNotesToStorage() {
    storageService.save(NOTES_KEY, gDummyNotes)
}


function getEmptyNote(type, title = '') {
    return { title, type }

}

function _createNote(title) {
    return {
        id: utilService.makeId(5),
        createdAt: Date.now(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt: title
        }
    }
  }


function _createNotes() {
    gDummyNotes = localStorageService.loadFromStorage(NOTES_KEY)
    if (!gDummyNotes || !gDummyNotes.length) {
        gDummyNotes = [
            // text notes
            {
                id: 'n101',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#f6e2dd'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#e2f6d3'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n103',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#f39f76'
                },
                info: {
                    txt: 'Fullstack RN!'
                }
            },
            {
                id: 'n104',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#e9e3d4'
                },
                info: {
                    txt: 'Fullstack It!'
                }
            },
            // image notes
            {
                id: 'n105',
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://www.coding-academy.org/books-photos/2.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#f39f76'
                }
            },
            // todos notes
            {
                id: 'n106',
                createdAt: Date.now(),
                type: 'NoteTodos',
                style: {
                    backgroundColor: '#f39f76'
                },
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        localStorageService.saveToStorage(NOTES_KEY, gDummyNotes)
    }
}
