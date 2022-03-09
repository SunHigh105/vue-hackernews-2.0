const { exec } = require('child_process');
const core = require('@actions/core');
const github = require('@actions/github');

const checkFileSize = () => {
  exec('sh file_size_check.sh', (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }

    return stdout;
  });
}

async function run() {
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');

  if ( typeof GITHUB_TOKEN !== 'string' ) {
    throw new Error('Invalid GITHUB_TOKEN: did you forget to set it in your action config?');
  }

  const { context = {} } = github;
  const { pull_request } = context.payload;

  if ( !pull_request ) {
    throw new Error('Could not find pull request!')
  };

  console.log(`Found pull request: ${pull_request.number}`);

  const octokit = github.getOctokit(GITHUB_TOKEN);

  await octokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `large size file exists: ${checkFileSize()}`,
  });
}

run().catch(e => core.setFailed(e.message));
