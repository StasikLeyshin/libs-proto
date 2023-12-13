const core = require('@actions/core');
const github = require('@actions/github');

try {
    // `who-to-greet` input defined in action metadata file
    // const nameToGreet = core.getInput('who-to-greet');
    // console.log(`Hello ${nameToGreet}!`);
    // const time = (new Date()).toTimeString();
    // core.setOutput("time", time);
    // // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);

    // {required: true} выкинет ошибку, если input не передан
    const TOKEN = core.getInput('github-token', {required: true});

    // client может использовать весть REST api от octokit https://octokit.github.io/rest.js/v18
    const client = new github.getOctokit(TOKEN);

    console.log(`We can even get context data, like the repo: ${github.context.repo.repo}`)

    // context содержит всю информацию
    // const {
    //     payload: {
    //         repository,
    //         organization: { login: owner },
    //         pull_request: pullRequest,
    //     },
    // } = context;
    // const isPRMerged = await octokit.pulls.checkIfMerged({
    //     owner,
    //     repo: repository.name,
    //     pull_number: pullRequest.number
    // });
    // console.log(isPRMerged)

} catch (error) {
    core.setFailed(error.message);
}
