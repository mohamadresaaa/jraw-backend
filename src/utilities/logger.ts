import chalk from "chalk"

/** Customize log
 * @param message
 * @param color
 * @package chalk
 */
export default (message: string, color: string = "cyan") => (console.log(chalk.keyword(color).bold(message)))
