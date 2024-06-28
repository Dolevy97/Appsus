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
    getEmptyTodo,
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
        console.log(note)
        return storageService.post(NOTES_KEY, note)
    }
}



function getEmptyNote(type="NoteTxt", txt = '') {
    const note = {
        id: '', 
        info: {},
        isPinned: false,
        style: { backgroundColor: 'white' },
        type ,
    }

    switch (type) {
        case 'NoteTxt':
            note.info.txt = txt
            break

        case 'NoteImg':
        case 'NoteVideo':
            note.info.url = ''
            break

        case 'NoteTodos':
            note.info.todos = []
            break

        default:
            break
    }

    return note
}


function getEmptyTodo() {
    return { txt: '', doneAt: null, id: utilService.makeId() }
  }

function _createNotes() {
    gDummyNotes = localStorageService.loadFromStorage(NOTES_KEY)
    if (!gDummyNotes || !gDummyNotes.length) {
        gDummyNotes = [
            // text notes
            {
                id: 'n101',
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
            },
            
            {
                id: 'n102',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#f6e2dd'
                },
                info: {
                    txt: 'Buy eggs!'
                }
            },
            {
                id: 'n103',
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'https://img.freepik.com/free-photo/vibrant-colors-nature-close-up-wet-purple-daisy-generated-by-artificial-intellingence_25030-63819.jpg',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#f39f76'
                }
            },
            {
                id: 'n104',
                createdAt:  Date.now(),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#e2f6d3'
                },
                info: {
                    txt: 'Buy milk and honey!'
                }
            },
            {
                id: 'n105',
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
                id: 'n106',
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
                id: 'n107',
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
                id: 'n108',
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
