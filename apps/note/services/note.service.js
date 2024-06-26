// note service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { localStorageService } from '../../../services/storage.service.js'

let gDummyNotes
const NOTES_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
}



function query() {
    return storageService.query(NOTES_KEY)
    .then(notes => {

        return notes
    })
}


function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}


function _createNotes() {
     gDummyNotes = localStorageService.loadFromStorage(NOTES_KEY)
    if (!gDummyNotes || !gDummyNotes.length) {
        gDummyNotes = [
            //text
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            //imgs
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            //todos
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
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