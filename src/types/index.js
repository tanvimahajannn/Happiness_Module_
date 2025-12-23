// Type definitions converted to JSDoc comments for reference

/**
 * @typedef {Object} Pillar
 * @property {string} id
 * @property {string} name
 * @property {string} emoji
 * @property {string} color
 * @property {string} description
 * @property {Exercise[]} exercises
 */

/**
 * @typedef {Object} Exercise
 * @property {string} id
 * @property {string} name
 * @property {string} icon
 * @property {number} duration
 * @property {string} description
 * @property {ExerciseStep[]} instructions
 * @property {string} pillarColor
 */

/**
 * @typedef {Object} ExerciseStep
 * @property {string} text
 * @property {number} duration
 * @property {'instruction' | 'action' | 'pause'} type
 */

export {};
