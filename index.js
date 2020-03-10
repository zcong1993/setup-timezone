const core = require('@actions/core');
const execa = require('execa');

const runCommand = (...args) => execa(...args).stdout.pipe(process.stdout)

async function run() {
  if (process.platform !== 'linux') {
    core.setFailed('only support linux now')
  }
  try { 
    const timezone = core.getInput('timezone');
    await runCommand('sudo', ['timedatectl', 'set-timezone', timezone])
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
