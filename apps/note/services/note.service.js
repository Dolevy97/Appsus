// note service

import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'


export const noteService = {
    noteTest,
    // query,
}





function query() {

}


function noteTest() {
    const dummyNotes = [
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
    return dummyNotes
}