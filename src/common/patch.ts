/**
 * !!! ensure process.cwd() correct
 */
process && process.chdir(__dirname.slice(0, __dirname.lastIndexOf('dist')))
