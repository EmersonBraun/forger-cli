const RED = '\x1b[31m';
const BLUE = "\x1b[34m";
const YELLOW = "\x1b[33m"
const GREEN = '\x1b[32m';
const NC = '\x1b[0m';

class Logger {
  info (msg) {
    console.log(`${BLUE}${msg} ${NC}`)
  }

  success (msg) {
    console.log(`${GREEN}${msg} ${NC}`)
  }

  warn (msg) {
    console.log(`${YELLOW}${msg} ${NC}`)
  }

  error (msg) {
    console.log(`${RED}${msg} ${NC}`)
  }
}

module.exports = new Logger()