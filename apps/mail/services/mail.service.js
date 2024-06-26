import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'emailDB'

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save
}

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Dolev Levy'
}


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regex.test(mail.body))
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) return storageService.put(MAIL_KEY, mail)
    else return storageService.post(MAIL_KEY, mail)
}


// Private Functions

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail(`e0`, undefined, true))
        for (var i = 1; i < 30; i++) {
            mails.push(_createMail(`e${i}`, utilService.getRandomIntInclusive(1706259102, Math.floor(Date.now() / 1000))))
        }
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(id, sentAt = Math.floor(Date.now() / 1000), isRead = false) {
    return {
        id,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead,
        sentAt,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}