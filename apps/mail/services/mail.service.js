import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

const MAIL_KEY = 'emailDB'

const loggedInUser = {
    email: 'Dolevy@appsus.com',
    fullname: 'Dolev Levy'
}

_createMails()

export const mailService = {
    query,
    getUser,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter
}



function query(filterBy = {}, sortBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {

            // Filtering
            mails = _filter(mails, filterBy)

            // Sorting
            mails = _sort(mails, sortBy)

            return mails
        })
}

function getUser() {
    return Promise.resolve(loggedInUser)
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

function getEmptyMail() {
    return {
        subject: '',
        body: '',
        isRead: false,
        isStarred: false,
        sentAt: null,
        removedAt: null,
        from: '',
        to: ''
    }
}

function getDefaultFilter() {
    return { txt: '', isRead: undefined, isStarred: undefined, status: undefined, labels: [] }
}

// Private Functions

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        mails.push(_createMail(`e0`, 'YonatanHershko@gmail.com', undefined, true))
        mails.push(_createMail(`e1`, 'DenisLibin@gmail.com', 1718715468, false))
        mails.push(_createMail(`e2`, 'GalShimer@gmail.com', 1718542668, false))
        mails.push(_createMail(`e3`, 'AdirGamil@gmail.com', 1718024268, false))
        mails.push(_createMail(`e4`, 'DukeBoxer@gmail.com', 1716209868, false))
        mails.push(_createMail(`e5`, 'PukiPuka@gmail.com', 1710939468, false))
        mails.push(_createMail(`e6`, 'Mitnase@apple.com', 1708433868, false))
        mails.push(_createMail(`e7`, 'PukiShooki@gmail.com', 1706705868, false))
        mails.push(_createMail(`e8`, 'DolevyLevy@gmail.com', 1704113868, false))
        mails.push(_createMail(`e9`, 'MukiDeez@gmail.com', 1700225868, false))
        mails.push(_createMail(`e10`, 'YonatanHershko@gmail.com', 1692277068, false))
        mails.push(_createMail(`e11`, 'YonatanHershko@gmail.com', 1681736268, false))
        mails.push(_createMail(`e12`, 'PukiPuka@gmail.com', 1676465868, false))
        mails.push(_createMail(`e13`, 'DukeBoxer@gmail.com', 1673960268, false))
        mails.push(_createMail(`e14`, 'PukiShooki@gmail.com', 1671800268, false))
        mails.push(_createMail(`e15`, 'GalShimer@gmail.com', 1671541068, false))
        mails.push(_createMail(`e16`, 'AdirGamil@gmail.com', 1669899468, false))
        mails.push(_createMail(`e17`, 'GalShimer@gmail.com', 1669381068, false))
        mails.push(_createMail(`e18`, 'GalShimer@gmail.com', 1668949068, false))
        mails.push(_createMail(`e19`, 'PukiShooki@gmail.com', 1668517068, false))
        mails.push(_createMail(`e20`, 'DenisLibin@gmail.com', 1668085068, false))
        mails.push(_createMail(`e21`, 'DukeBoxer@gmail.com', 1667912268, false))
        mails.push(_createMail(`e22`, 'AdirGamil@gmail.com', 1667221068, false))
        mails.push(_createMail(`e23`, 'MukiDeez@gmail.com', 1666961868, false))
        mails.push(_createMail(`e24`, 'AdirGamil@gmail.com', 1666616268, false))
        mails.push(_createMail(`e25`, 'MukiDeez@gmail.com', 1664369868, false))
        mails.push(_createMail(`e26`, 'DukeBoxer@gmail.com', 1663246668, false))
        mails.push(_createMail(`e27`, 'DenisLibin@gmail.com', 1661950668, false))
        mails.push(_createMail(`e28`, 'AdirGamil@gmail.com', 1661432268, false))
        mails.push(_createMail(`e29`, 'AdirGamil@gmail.com', 1661259468, false))
        mails.push(_createMail(`e30`, 'DukeBoxer@gmail.com', 1661000268, false))

        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(id, from = 'momo@momo.com', sentAt = Math.floor(Date.now() / 1000), isRead = false) {
    return {
        id,
        subject: utilService.makeLorem(utilService.getRandomIntInclusive(1, 4)),
        body: utilService.makeLorem(utilService.getRandomIntInclusive(5, 20)),
        isRead,
        isStarred: false,
        sentAt,
        removedAt: null,
        from,
        to: loggedInUser.email
    }
}

function _filter(mails, filterBy) {
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.body) || regex.test(mail.subject) || regex.test(mail.from))
    }
    if (filterBy.isRead !== undefined) {
        mails = mails.filter(mail => mail.isRead === filterBy.isRead)
    }
    if (filterBy.status === 'inbox') {
        mails = mails.filter(mail => mail.to === loggedInUser.email && !mail.removedAt && mail.sentAt)
    }
    if (filterBy.status === 'sent') {
        mails = mails.filter(mail => mail.from === loggedInUser.email)
    }
    if (filterBy.status === 'starred') {
        mails = mails.filter(mail => mail.isStarred)
    }
    if (filterBy.status === 'drafts') {
        mails = mails.filter(mail => !mail.sentAt)
    }
    if (filterBy.status === 'trash') {
        mails = mails.filter(mail => mail.removedAt)
    }
    return mails
}

function _sort(mails, sortBy) {
    if (sortBy.subject) {
        mails = mails.toSorted((m1, m2) => m1.subject.localeCompare(m2.subject) * sortBy.subject)
    }
    if (sortBy.date) {
        mails = mails.toSorted((m1, m2) => (m1.sentAt - m2.sentAt) * sortBy.date)
    }
    return mails
}