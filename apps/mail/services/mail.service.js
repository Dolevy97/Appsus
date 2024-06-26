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
        mails.push(_createMail(`e1`, 1718715468, false))
        mails.push(_createMail(`e2`, 1718542668, false))
        mails.push(_createMail(`e3`, 1718024268, false))
        mails.push(_createMail(`e4`, 1716209868, false))
        mails.push(_createMail(`e5`, 1710939468, false))
        mails.push(_createMail(`e6`, 1708433868, false))
        mails.push(_createMail(`e7`, 1706705868, false))
        mails.push(_createMail(`e8`, 1704113868, false))
        mails.push(_createMail(`e9`, 1700225868, false))
        mails.push(_createMail(`e10`, 1692277068, false))
        mails.push(_createMail(`e11`, 1681736268, false))
        mails.push(_createMail(`e12`, 1676465868, false))
        mails.push(_createMail(`e13`, 1673960268, false))
        mails.push(_createMail(`e14`, 1671800268, false))
        mails.push(_createMail(`e15`, 1671541068, false))
        mails.push(_createMail(`e16`, 1669899468, false))
        mails.push(_createMail(`e17`, 1669381068, false))
        mails.push(_createMail(`e18`, 1668949068, false))
        mails.push(_createMail(`e19`, 1668517068, false))
        mails.push(_createMail(`e20`, 1668085068, false))
        mails.push(_createMail(`e21`, 1667912268, false))
        mails.push(_createMail(`e22`, 1667221068, false))
        mails.push(_createMail(`e23`, 1666961868, false))
        mails.push(_createMail(`e24`, 1666616268, false))
        mails.push(_createMail(`e25`, 1664369868, false))
        mails.push(_createMail(`e26`, 1663246668, false))
        mails.push(_createMail(`e27`, 1661950668, false))
        mails.push(_createMail(`e28`, 1661432268, false))
        mails.push(_createMail(`e29`, 1661259468, false))
        mails.push(_createMail(`e30`, 1661000268, false))

        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(id, sentAt = Math.floor(Date.now() / 1000), isRead = false) {
    return {
        id,
        subject: 'Miss you!',
        body: utilService.makeLorem(utilService.getRandomIntInclusive(5,20)),
        isRead,
        isStarred: false,
        sentAt,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    }
}