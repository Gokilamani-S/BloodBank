/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {'donor' | 'manager' | 'admin'} role
 * @property {string} [bloodBank]
 * @property {string} [bloodType]
 * @property {Date} [lastDonation]
 */

/**
 * @typedef {Object} AuthState
 * @property {User | null} user
 * @property {string | null} token
 * @property {(user: User | null) => void} setUser
 * @property {(token: string | null) => void} setToken
 * @property {() => void} logout
 */
