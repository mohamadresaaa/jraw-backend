import chalk from "chalk"

/** Customize log
 * @param {string} message
 * @param {string} color
 * @package chalk
 */
export default (message: string, color: string = "cyan") => (console.log(chalk.keyword(color).bold(message)))
