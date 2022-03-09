const { exec } = require('child_process');

const checkFileSize = () => {
  exec('sh file_size_check.sh', (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }

    return stdout;
    // console.log(`stdout: ${stdout}`);
    // console.log(`stderr: ${stderr}`);
  });
}

const addCommentOnPullRequest = () => {
  const { issue: { number: issue_number }, repo: { owner, repo }  } = context;
  github.issues.createComment({ issue_number, owner, repo, body: `large size file exist: ${checkFileSize()}` });
};

(() => {
  try {
    addCommentOnPullRequest();
  } catch (err) {
    console.log(err);
  }
});
