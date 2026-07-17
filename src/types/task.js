/**
 * Task data contracts — JSDoc for IDE hints, plain JS for runtime.
 */

/**
 * @typedef {"todo" | "in_progress" | "done"} TaskStatus
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {TaskStatus} status
 * @property {User} [assignedTo]
 * @property {string} [assignedToId]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

// no-op export for module boundary
export {};
