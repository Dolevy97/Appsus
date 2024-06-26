import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';
import { localStorageService } from '../../../services/storage.service.js';

let gDummyNotes;
const NOTES_KEY = 'noteDB';

// Initialize notes if not already in localStorage
_createNotes();

export const noteService = {
    query,
    get,
    remove,
    getDefaultFilter,
    save,
};

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = gDummyNotes;
                _saveNotesToStorage();
            }
            
            // Filter by type
            if (filterBy.type) {
                const regExp = new RegExp(filterBy.type, "i");
                notes = notes.filter((note) => regExp.test(note.type));
            }
            
            // Filter by text
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, "i");
                notes = notes.filter((note) => regExp.test(note.info.txt));
            }
            
            return notes;
        });
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function getDefaultFilter() {
    return { text: '', type: '' };
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note);
    } else {
        // note.id = utilService.makeId();
        // note.createdAt = Date.now();
        return storageService.post(NOTES_KEY, note);
    }
}

function _saveNotesToStorage() {
    storageService.save(NOTES_KEY, gDummyNotes);
}

function _createNotes() {
    gDummyNotes = localStorageService.loadFromStorage(NOTES_KEY);
    if (!gDummyNotes || !gDummyNotes.length) {
        gDummyNotes = [
            // text notes
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
            {
                id: 'n102',
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
            {
                id: 'n103',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack RN!'
                }
            },
            {
                id: 'n104',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack It!'
                }
            },
            // image notes
            {
                id: 'n105',
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
            // todos notes
            {
                id: 'n106',
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
        localStorageService.saveToStorage(NOTES_KEY, gDummyNotes);
    }
}
