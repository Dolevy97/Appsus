import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const API_KEY = 'AIzaSyC3JYJV46HLqEVYXfj9bo5_b4yO0UOD_WI'
const STORAGE_KEY = 'gBooksDB'

const gBookCache = localStorageService.loadFromStorage(STORAGE_KEY) || {}

export const googleBookService = {
    query,
    get,
    save,
}

function query(filterBy = {}) {
    if (!filterBy.title) return Promise.resolve(null)
    if (gBookCache[filterBy.title]) {
        return Promise.resolve(gBookCache[filterBy.title].books)
    }
    return searchGoogleBooks(filterBy.title)
        .then(books => {
            // Map over each book to fetch its thumbnail and format the data
            const promises = books.map(book => {
                return getImageFromGoogle(book.id)
                    .then(thumbnail => {
                        if (thumbnail && thumbnail.startsWith('http:')) {
                            thumbnail = thumbnail.replace('http:', 'https:')
                        }
                        return {
                            id: book.id,
                            title: book.volumeInfo.title,
                            subtitle: book.volumeInfo.subtitle || '',
                            authors: book.volumeInfo.authors || [],
                            publishedDate: book.volumeInfo.publishedDate,
                            description: book.volumeInfo.description || '',
                            pageCount: book.volumeInfo.pageCount || 0,
                            categories: book.volumeInfo.categories || [],
                            thumbnail: thumbnail || `https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg`,
                            language: book.volumeInfo.language
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching thumbnail for book:', book.id, error);
                        return {
                            id: book.id,
                            title: book.volumeInfo.title,
                            subtitle: book.volumeInfo.subtitle || '',
                            authors: book.volumeInfo.authors || [],
                            publishedDate: book.volumeInfo.publishedDate,
                            description: book.volumeInfo.description || '',
                            pageCount: book.volumeInfo.pageCount || 0,
                            categories: book.volumeInfo.categories || [],
                            thumbnail: `https://marketplace.canva.com/EAFMf17QgBs/1/0/1003w/canva-green-and-yellow-modern-book-cover-business-Ah-do4Y91lk.jpg`,
                            language: book.volumeInfo.language
                        }
                    })
            })

            return Promise.all(promises).then(books => {
                gBookCache[filterBy.title] = { books }
                localStorageService.saveToStorage(STORAGE_KEY, gBookCache)
                return books
            })
        })
        .catch(error => {
            console.error('Error querying Google Books:', error)
            return []
        })
}

function searchGoogleBooks(value) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(value)}&key=${API_KEY}`
    return fetch(url)
        .then(res => {
            if (res.ok) return res.json()
            else throw new Error('Network response was not ok.')
        })
        .then(data => {
            return data.items
        })
        .catch(error => console.log(error))
}


function getImageFromGoogle(bookId) {
    const url = `https://www.googleapis.com/books/v1/volumes/${bookId}`
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            else throw new Error('Network response was not ok.')
        })
        .then(data => {
            return data.volumeInfo.imageLinks.small
        })
        .catch(error => console.log(error))
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}