const usedCommandRecently = new Set()

/**
 * Check is number filtered
 * @param  {String} from
 */
const isFiltered = (chat) => !!usedCommandRecently.has(chat)

/**
 * Add number to filter
 * @param  {String} from
 */
const addFilter = (chat) => {
    usedCommandRecently.add(chat)
    setTimeout(() => usedCommandRecently.delete(chat), 5000) // 5sec is delay before processing next command
}

module.exports = {
    isFiltered,
    addFilter
}