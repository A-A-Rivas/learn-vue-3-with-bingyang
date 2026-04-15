const BASE_URL = 'http://localhost:3000/blogPosts'



/**
 * fetch all blog posts from the API
 * @returns {Promise<Array>} a promise that resolves to an array of blog posts
 */
const findAll = async () => {
    try {
        const response = await fetch(BASE_URL)

        if (!response.ok) {
            throw new Error(`Error fetching blog posts: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error(error)
        throw error // rethrows the error to be caught by the caller
    }
}


/**
 * fetch a single blog post by its ID
 * @param {number} id           the ID of the blog post to fetch
 * @returns {Promise<Object}   a promise that resolves to the blog post object
 */
const findById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)

        if (!response.ok) {
            throw new Error(`Error fetching blog post with ID ${id}: ${response.statusText}`)
        }

        return await response.json()

    } catch (error) {
        console.error(error)
        throw error // rethrows the error to be caught by the caller
    }
}


export default {findAll, findById}