import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Dolev Levy'
}

// Private Functions

function _createEmails() {
    let email = storageService
}

function _createEmail() {
    return {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: null,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}